import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLASS_TWEAKS_T1, lerpGlassTweaks } from '@/lib/glass/scroll-tweaks';
import { sampleIntroEase, type EaseId, type BezierHandles } from '@/lib/glass/intro-easing';

export interface GlassTweaks {
  ior: number;
  transmission: number;
  thickness: number;
  dispersion: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  iridescence: number;
  iridescenceIOR: number;
  envMapIntensity: number;
  specularIntensity: number;
  attenuationDistance: number;
  dichroic: number;
  fresnelPower: number;
  filmBase: number;
  filmAmp: number;
  exposure: number;
  /** Logo size in % where 100 = former max (~80% of screen width). Range 0–1000. */
  logoScale: number;
  logoX: number;
  logoY: number;
  /** Y rotation in degrees. */
  logoRotY: number;
  sheen: number;
  sheenRoughness: number;
  metalness: number;
  /** Hex colors */
  color: string;
  attenuation: string;
  specularColor: string;
  sheenColor: string;
  tint: string;
  tintStrength: number;
  flare: string;
  flareStrength: number;
  spectralHue: number;
  spectralSat: number;
  noiseAmount: number;
  noiseScale: number;
  noiseDistort: number;
  creamStrength: number;
}

/** Former max screen fraction; maps to logoScale 100%. */
export const LOGO_SCALE_REF = 0.8;

/**
 * Minimum logoScale (%) used only for transmission thickness.
 * Keeps small logos refracting as punchy as a ~750% logo; visual size still follows logoScale.
 */
export const OPTICAL_MIN_LOGO_SCALE = 750;

/** Defaults = t1 (opening pose). */
export const DEFAULT_GLASS_TWEAKS: GlassTweaks = { ...GLASS_TWEAKS_T1 };

export interface GlassExperience {
  readonly paused: boolean;
  setPaused(value: boolean): void;
  step(direction: number): void;
  goTo(index: number): void;
  getTweaks(): GlassTweaks;
  setTweaks(partial: Partial<GlassTweaks>): GlassTweaks;
  resetTweaks(): GlassTweaks;
  /** 0 = t1 pose, 1 = t2 pose. Drives logo shrink / retreat / material blend. */
  setScrollBlend(t: number, from: GlassTweaks, to: GlassTweaks): GlassTweaks;
  /** Target scroll progress 0…1; experience eases toward it every frame (smooth scroll). */
  setScrollTarget(t: number, from: GlassTweaks, to: GlassTweaks): void;
  /** Bind hero-track element; scroll progress is sampled every frame from window.scrollY. */
  bindScrollTrack(el: HTMLElement | null, from: GlassTweaks, to: GlassTweaks): void;
  /** Enable/disable T1→T2 scroll morph (off while designing a new animation). */
  setScrollMorphEnabled(enabled: boolean): void;
  /** Autoplay T1→T2 blend with duration + easing (independent of scroll). */
  playIntro(
    from: GlassTweaks,
    to: GlassTweaks,
    opts: {
      duration: number;
      ease: EaseId;
      bezier: BezierHandles;
      /** Jump straight to `to` (return visits / reduced motion). */
      skip?: boolean;
      onUpdate?: (tweaks: GlassTweaks) => void;
      onComplete?: () => void;
    },
  ): void;
  cancelIntro(): void;
  /** Enable/disable mouse drag of the glass logo. */
  setDragEnabled(enabled: boolean): void;
  /** Request sensors + start tilt parallax (needs HTTPS / user gesture). */
  enableMotionParallax(): Promise<{ ok: boolean; reason?: string }>;
  isMotionParallaxActive(): boolean;
  /** Slow upward drift of the hero slideshow plane (0…1). */
  setBackgroundParallax(t: number): void;
  dispose(): void;
}

const HOLD_SECONDS = 5.2;
const FADE_SECONDS = 2.4;

/** Phones / coarse touch — MeshPhysical transmission is the killer. */
function detectLowPowerGpu() {
  if (typeof window === 'undefined') return false;
  const narrow = window.matchMedia('(max-width: 640px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const ua = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  return narrow || ua || (coarse && window.innerWidth < 900);
}

function hexToColor(hex: string, target = new THREE.Color()) {
  try { return target.set(hex); } catch { return target.set('#ffffff'); }
}

const SLIDE_IMAGES = ['/home/interior/img_9281.avif', '/home/interior/img_9291.avif', '/home/interior/img_9297.avif'];

/** A shared WebGL scene keeps the image seen through the glass in sync with the slideshow. */
export async function createGlassExperience(
  host: HTMLElement,
  onSlide: (index: number) => void,
  onLogoPose?: (pose: { x: number; y: number }) => void,
  onScrollSmooth?: (t: number) => void,
): Promise<GlassExperience> {
  const lowPower = detectLowPowerGpu();
  const maxPixelRatio = lowPower ? 1 : 1.5;
  const transmissionScale = lowPower ? 0.4 : 1.25;
  const introReportStep = lowPower ? 0.06 : 0.02;

  const renderer = new THREE.WebGLRenderer({
    antialias: !lowPower,
    alpha: false,
    powerPreference: 'high-performance',
    // Needed so the liquid lens follower can sample logo + slides each frame.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = DEFAULT_GLASS_TWEAKS.exposure;
  // Transmission buffer is a full extra scene render — keep it lean on phones.
  renderer.transmissionResolutionScale = transmissionScale;
  renderer.setClearColor(0x0a0509);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Трёхмерный стеклянный логотип PODIUM');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.z = 12;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let disposed = false;
  const textureLoader = new THREE.TextureLoader();
  const imageTextures: THREE.Texture[] = [];
  let model: THREE.Group;
  try {
    const results = await Promise.all([
      ...SLIDE_IMAGES.map(async (src, n) => {
        const texture = await textureLoader.loadAsync(src);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(lowPower ? 1 : 8, renderer.capabilities.getMaxAnisotropy());
        if (lowPower) {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
        }
        imageTextures[n] = texture;
        return texture;
      }),
      new GLTFLoader().loadAsync('/logo/podium-inflated.glb'),
    ]);
    model = (results[SLIDE_IMAGES.length] as Awaited<ReturnType<GLTFLoader['loadAsync']>>).scene;
  } catch (error) {
    imageTextures.forEach(texture => texture.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    throw error;
  }

  const studio = new THREE.Scene();
  studio.background = new THREE.Color(.055, .065, .095);
  const studioResources: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];
  function lightCard(x: number, y: number, z: number, w: number, h: number, color: number, intensity: number) {
    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
    studioResources.push({ geometry, material });
  }
  lightCard(-4, 5, 5, 3.2, 7.5, 0xfff8ef, 2.5);
  lightCard(4, 3, 4, 1.2, 8, 0xffffff, 4);
  lightCard(0, 7, 0, 9, 2, 0xffe0ef, 2);
  lightCard(-5, -2, 2, 2, 7, 0xf04b93, 3);
  lightCard(5, -1, 1, 1.7, 6, 0xd6266f, 3);
  lightCard(1, -5, 3, 6, .75, 0xffffff, 3);
  lightCard(-3, 1, -4, 3, 5, 0xff8a05, 3);
  lightCard(1, 0, 7, .28, 8, 0xffffff, 4);
  lightCard(-2, 0, 6, .85, 6, 0xf04b93, 3);
  lightCard(2.7, 0, 6, .65, 6, 0xff9e00, 3);
  lightCard(-.7, 2, 6, .3, 6, 0x9e1a52, 3);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, .035, .1, 100);
  scene.environment = environment.texture;
  pmrem.dispose();
  studioResources.forEach(({ geometry, material }) => { geometry.dispose(); material.dispose(); });

  const firstImage = imageTextures[0]?.image as { width?: number; height?: number } | undefined;
  const firstAspect = firstImage?.width && firstImage?.height
    ? firstImage.width / firstImage.height
    : 2560 / 1440;

  const coverZoom = lowPower ? 1.28 : 1.08;
  const backgroundMaterial = new THREE.ShaderMaterial({
    uniforms: {
      imageA: { value: imageTextures[0] }, imageB: { value: imageTextures[1] },
      fade: { value: 0 }, aspect: { value: 1 }, imageAspect: { value: firstAspect },
      zoom: { value: 1 },
      coverZoom: { value: coverZoom },
      parallax: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `varying vec2 vUv;
      void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform sampler2D imageA; uniform sampler2D imageB;
      uniform float fade; uniform float aspect; uniform float imageAspect; uniform float zoom; uniform float coverZoom; uniform vec2 parallax;
      varying vec2 vUv;
      void main(){
        // object-fit: cover — uniform zoom; extra headroom for tilt / mouse parallax.
        vec2 cover=vec2(min(aspect/imageAspect,1.0),min(imageAspect/aspect,1.0));
        float z=zoom*coverZoom;
        vec2 uv=(vUv-.5)*cover/z+.5;
        uv.x+=parallax.x;
        uv.y+=parallax.y;
        vec3 c=mix(texture2D(imageA,uv).rgb,texture2D(imageB,uv).rgb,fade);
        float vignette=1.0-.23*smoothstep(.15,.72,length((vUv-.5)*vec2(.9,1.)));
        gl_FragColor=vec4(c*.82*vignette,1.0);
        #include <colorspace_fragment>
      }`,
    depthWrite: false,
    toneMapped: false,
  });
  const background = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), backgroundMaterial);
  background.position.z = -5;
  scene.add(background);

  function syncImageAspect(texture: THREE.Texture | undefined) {
    const img = texture?.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      backgroundMaterial.uniforms.imageAspect.value = img.width / img.height;
    }
  }
  syncImageAspect(imageTextures[0]);

  const tweaks: GlassTweaks = { ...DEFAULT_GLASS_TWEAKS };
  const glassUniforms = {
    uDichroic: { value: tweaks.dichroic },
    uFresnelPow: { value: tweaks.fresnelPower },
    uFilmBase: { value: tweaks.filmBase },
    uFilmAmp: { value: tweaks.filmAmp },
    uTint: { value: hexToColor(tweaks.tint) },
    uTintStrength: { value: tweaks.tintStrength },
    uFlare: { value: hexToColor(tweaks.flare) },
    uFlareStrength: { value: tweaks.flareStrength },
    uSpectralHue: { value: tweaks.spectralHue },
    uSpectralSat: { value: tweaks.spectralSat },
    uNoiseAmount: { value: tweaks.noiseAmount },
    uNoiseScale: { value: tweaks.noiseScale },
    uNoiseDistort: { value: tweaks.noiseDistort },
    uCreamStrength: { value: tweaks.creamStrength },
  };

  const glass = new THREE.MeshPhysicalMaterial({
    color: hexToColor(tweaks.color),
    metalness: tweaks.metalness,
    roughness: tweaks.roughness,
    transmission: tweaks.transmission,
    thickness: .55,
    ior: tweaks.ior,
    // Dispersion = multi-pass refraction — too heavy for most phones.
    dispersion: lowPower ? 0 : tweaks.dispersion,
    iridescence: lowPower ? Math.min(tweaks.iridescence, 0.45) : tweaks.iridescence,
    iridescenceIOR: tweaks.iridescenceIOR,
    iridescenceThicknessRange: [180, 720],
    clearcoat: lowPower ? 0 : tweaks.clearcoat,
    clearcoatRoughness: tweaks.clearcoatRoughness,
    envMapIntensity: tweaks.envMapIntensity,
    attenuationColor: hexToColor(tweaks.attenuation),
    attenuationDistance: tweaks.attenuationDistance,
    specularIntensity: tweaks.specularIntensity,
    specularColor: hexToColor(tweaks.specularColor),
    sheen: lowPower ? Math.min(tweaks.sheen, 0.25) : tweaks.sheen,
    sheenRoughness: tweaks.sheenRoughness,
    sheenColor: hexToColor(tweaks.sheenColor),
    side: lowPower ? THREE.FrontSide : THREE.DoubleSide,
    flatShading: false,
  });

  glass.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, glassUniforms);
    shader.vertexShader = 'varying vec3 vGlassPosition;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlassPosition = position;');
    shader.fragmentShader = `
      varying vec3 vGlassPosition;
      uniform float uDichroic;
      uniform float uFresnelPow;
      uniform float uFilmBase;
      uniform float uFilmAmp;
      uniform vec3 uTint;
      uniform float uTintStrength;
      uniform vec3 uFlare;
      uniform float uFlareStrength;
      uniform float uSpectralHue;
      uniform float uSpectralSat;
      uniform float uNoiseAmount;
      uniform float uNoiseScale;
      uniform float uNoiseDistort;
      uniform float uCreamStrength;
      float hash13(vec3 p){
        p=fract(p*0.1031); p+=dot(p,p.yzx+33.33);
        return fract((p.x+p.y)*p.z);
      }
      float noise3(vec3 x){
        vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
        return mix(
          mix(mix(hash13(i),hash13(i+vec3(1,0,0)),f.x),mix(hash13(i+vec3(0,1,0)),hash13(i+vec3(1,1,0)),f.x),f.y),
          mix(mix(hash13(i+vec3(0,0,1)),hash13(i+vec3(1,0,1)),f.x),mix(hash13(i+vec3(0,1,1)),hash13(i+vec3(1,1,1)),f.x),f.y),
          f.z);
      }
      vec3 hueShift(vec3 c, float h){
        const vec3 k=vec3(0.57735);
        float cosA=cos(h*6.2831853); float sinA=sin(h*6.2831853);
        return c*cosA+cross(k,c)*sinA+k*dot(k,c)*(1.0-cosA);
      }
      vec3 satAdjust(vec3 c, float s){
        float l=dot(c,vec3(0.2126,0.7152,0.0722));
        return mix(vec3(l),c,s);
      }
    ` + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_physical_fragment>', `
      #include <lights_physical_fragment>
      float filmNoise = noise3(vGlassPosition * uNoiseScale);
      material.iridescenceThickness = uFilmBase + uFilmAmp * (0.5 + 0.5 * sin(vGlassPosition.x * 0.009 + vGlassPosition.y * 0.014 + filmNoise * uNoiseAmount * 6.2831853));
    `);
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', `
      vec3 glassView = normalize(vViewPosition);
      vec3 glassReflection = reflect(-glassView, normal);
      float glassFresnel = pow(1.0 - clamp(abs(dot(normal, glassView)), 0.0, 1.0), uFresnelPow);
      float glassNoise = noise3(vGlassPosition * uNoiseScale * 1.7);
      float spectralPhase = fract(atan(glassReflection.x, glassReflection.z) * 0.68 + glassReflection.y * 0.45 + 0.15 + glassNoise * uNoiseDistort);
      vec3 spectralColor;
      if(spectralPhase < 0.20) {
        spectralColor = mix(vec3(1.0,0.55,0.18),vec3(1.0,0.92,0.70),spectralPhase / 0.20);
      } else if(spectralPhase < 0.32) {
        spectralColor = mix(vec3(1.0,0.92,0.70),vec3(0.45,0.70,0.82),(spectralPhase-0.20)/0.12);
      } else if(spectralPhase < 0.53) {
        spectralColor = mix(vec3(0.45,0.70,0.82),vec3(0.22,0.16,0.14),(spectralPhase-0.32)/0.21);
      } else if(spectralPhase < 0.77) {
        spectralColor = mix(vec3(0.22,0.16,0.14),vec3(0.62,0.32,0.28),(spectralPhase-0.53)/0.24);
      } else {
        spectralColor = mix(vec3(0.62,0.32,0.28),vec3(1.0,0.55,0.18),(spectralPhase-0.77)/0.23);
      }
      spectralColor = satAdjust(hueShift(spectralColor, uSpectralHue), uSpectralSat);
      float studioEnergy = min(dot(totalSpecular,vec3(0.2126,0.7152,0.0722)),1.7);
      vec3 dichroicReflection = spectralColor * (0.7 + studioEnergy);
      dichroicReflection = mix(dichroicReflection, uFlare * (0.55 + studioEnergy), uFlareStrength);
      outgoingLight = mix(outgoingLight, dichroicReflection, glassFresnel * uDichroic);
      outgoingLight *= mix(vec3(1.0), uTint, uTintStrength * uCreamStrength * (1.0 - glassFresnel));
      #include <opaque_fragment>
    `);
  };
  glass.customProgramCacheKey = () => 'podium-glass-tweaks-v1';

  model.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const original = Array.isArray(object.material) ? object.material : [object.material];
    original.forEach(material => material.dispose());

    // Weld splits + smooth normals so refraction bends don't show polygonal kinks.
    let geometry = object.geometry as THREE.BufferGeometry;
    try {
      geometry = mergeVertices(geometry, 1e-4);
      geometry.computeVertexNormals();
      object.geometry.dispose();
      object.geometry = geometry;
    } catch {
      object.geometry.computeVertexNormals();
    }

    object.material = glass;
    object.castShadow = false;
    object.receiveShadow = false;
  });
  const bounds = new THREE.Box3().setFromObject(model);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  model.position.sub(center);
  const logo = new THREE.Group();
  logo.add(model);
  scene.add(logo);
  logo.rotation.set(.018, THREE.MathUtils.degToRad(tweaks.logoRotY ?? 0), 0);

  const scaleState = { base: 1 };
  const logoOffset = new THREE.Vector2(tweaks.logoX, tweaks.logoY);
  let dragging = false;
  let dragEnabled = false;
  let dragPointerId: number | null = null;
  const lastDrag = new THREE.Vector2();
  const canvas = renderer.domElement;
  canvas.style.touchAction = 'pan-y';
  canvas.style.cursor = 'default';
  canvas.style.pointerEvents = 'auto';

  function worldAtLogoDepth() {
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    return { width: visibleHeight * camera.aspect, height: visibleHeight };
  }

  function logoScreenFraction() {
    return Math.max(0.001, (tweaks.logoScale / 100) * LOGO_SCALE_REF);
  }

  function emitLogoPose() {
    tweaks.logoX = logoOffset.x;
    tweaks.logoY = logoOffset.y;
    onLogoPose?.({ x: logoOffset.x, y: logoOffset.y });
  }

  let logoScrollLiftSmooth = 0;
  let logoScrollLiftTarget = 0;
  const LOGO_LIFT_LAG = 3.4;

  function applyLogoTransform() {
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    // Scroll down → logo rises above the fader.
    const exitSpan = Math.max(1, window.innerHeight * 1.13);
    const exitT = Math.min(1, Math.max(0, window.scrollY / exitSpan));
    const exitEased = reducedMotion.matches
      ? exitT
      : exitT * exitT * (3 - 2 * exitT); // smoothstep
    logoScrollLiftTarget = exitEased * visibleHeight * 0.54;

    logo.scale.setScalar(scaleState.base);
    logo.position.set(logoOffset.x, logoOffset.y + logoScrollLiftSmooth, 0);
    logo.rotation.y = THREE.MathUtils.degToRad(tweaks.logoRotY ?? 0);
    logo.rotation.z = 0;

    // Visual size ≠ optical path: floor thickness as if the logo were at least OPTICAL_MIN_LOGO_SCALE.
    const opticalMin = lowPower ? 280 : OPTICAL_MIN_LOGO_SCALE;
    const opticalFraction = Math.max(
      logoScreenFraction(),
      (opticalMin / 100) * LOGO_SCALE_REF,
    );
    const opticalBase = (visibleHeight * camera.aspect * opticalFraction) / Math.max(size.x, 1e-6);
    const fitThickness = Math.max(0.22, size.z * opticalBase * 2.6);
    glass.thickness = fitThickness * tweaks.thickness;
  }

  function applyTweaks() {
    glass.color.copy(hexToColor(tweaks.color));
    glass.attenuationColor.copy(hexToColor(tweaks.attenuation));
    glass.specularColor.copy(hexToColor(tweaks.specularColor));
    glass.sheenColor.copy(hexToColor(tweaks.sheenColor));
    glass.ior = tweaks.ior;
    // Glass stays fully transmissive — scroll morph must not fade it opaque.
    glass.transmission = 1;
    tweaks.transmission = 1;
    glass.dispersion = lowPower ? 0 : tweaks.dispersion;
    glass.roughness = tweaks.roughness;
    glass.clearcoat = lowPower ? 0 : tweaks.clearcoat;
    glass.clearcoatRoughness = tweaks.clearcoatRoughness;
    glass.iridescence = lowPower ? Math.min(tweaks.iridescence, 0.45) : tweaks.iridescence;
    glass.iridescenceIOR = tweaks.iridescenceIOR;
    glass.envMapIntensity = tweaks.envMapIntensity;
    glass.specularIntensity = tweaks.specularIntensity;
    glass.attenuationDistance = tweaks.attenuationDistance;
    glass.sheen = lowPower ? Math.min(tweaks.sheen, 0.25) : tweaks.sheen;
    glass.sheenRoughness = tweaks.sheenRoughness;
    glass.metalness = tweaks.metalness;
    glassUniforms.uDichroic.value = lowPower ? tweaks.dichroic * 0.65 : tweaks.dichroic;
    glassUniforms.uFresnelPow.value = tweaks.fresnelPower;
    glassUniforms.uFilmBase.value = tweaks.filmBase;
    glassUniforms.uFilmAmp.value = lowPower ? tweaks.filmAmp * 0.55 : tweaks.filmAmp;
    glassUniforms.uTint.value.copy(hexToColor(tweaks.tint));
    glassUniforms.uTintStrength.value = tweaks.tintStrength;
    glassUniforms.uFlare.value.copy(hexToColor(tweaks.flare));
    glassUniforms.uFlareStrength.value = tweaks.flareStrength;
    glassUniforms.uSpectralHue.value = tweaks.spectralHue;
    glassUniforms.uSpectralSat.value = tweaks.spectralSat;
    glassUniforms.uNoiseAmount.value = lowPower ? Math.min(tweaks.noiseAmount, 0.25) : tweaks.noiseAmount;
    glassUniforms.uNoiseScale.value = tweaks.noiseScale;
    glassUniforms.uNoiseDistort.value = lowPower ? Math.min(tweaks.noiseDistort, 0.15) : tweaks.noiseDistort;
    glassUniforms.uCreamStrength.value = tweaks.creamStrength;
    renderer.toneMappingExposure = tweaks.exposure;
    // Keep live drag pose; only sync from tweaks when not dragging.
    if (!dragging) logoOffset.set(tweaks.logoX, tweaks.logoY);
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    scaleState.base = (visibleHeight * camera.aspect * logoScreenFraction()) / size.x;
    applyLogoTransform();
  }

  function setTweaks(partial: Partial<GlassTweaks>): GlassTweaks {
    cancelIntro();
    Object.assign(tweaks, partial);
    applyTweaks();
    return { ...tweaks };
  }

  function setScrollBlend(t: number, from: GlassTweaks, to: GlassTweaks): GlassTweaks {
    const blended = lerpGlassTweaks(from, to, t);
    Object.assign(tweaks, blended);
    applyTweaks();
    return { ...tweaks };
  }

  let scrollTarget = 0;
  let scrollSmooth = 0;
  let scrollBlendFrom = GLASS_TWEAKS_T1;
  let scrollBlendTo = GLASS_TWEAKS_T1;
  let lastReportedScroll = -1;
  /** T1→T2 logo morph along the hero scroll (kept optional; intro is the default). */
  let scrollMorphEnabled = false;
  const SCROLL_SMOOTH_RATE = 4.2;
  let scrollTrack: HTMLElement | null = null;

  type IntroState = {
    from: GlassTweaks;
    to: GlassTweaks;
    duration: number;
    ease: EaseId;
    bezier: BezierHandles;
    elapsed: number;
    onUpdate?: (tweaks: GlassTweaks) => void;
    onComplete?: () => void;
    lastReported: number;
  };
  let intro: IntroState | null = null;

  function cancelIntro() {
    intro = null;
  }

  function playIntro(
    from: GlassTweaks,
    to: GlassTweaks,
    opts: {
      duration: number;
      ease: EaseId;
      bezier: BezierHandles;
      skip?: boolean;
      onUpdate?: (tweaks: GlassTweaks) => void;
      onComplete?: () => void;
    },
  ) {
    cancelIntro();
    if (reducedMotion.matches || opts.skip) {
      Object.assign(tweaks, to);
      applyTweaks();
      opts.onUpdate?.({ ...tweaks });
      opts.onComplete?.();
      return;
    }
    const duration = Math.max(0.05, opts.duration);
    intro = {
      from: { ...from },
      to: { ...to },
      duration,
      ease: opts.ease,
      bezier: [...opts.bezier],
      elapsed: 0,
      onUpdate: opts.onUpdate,
      onComplete: opts.onComplete,
      lastReported: -1,
    };
    Object.assign(tweaks, from);
    applyTweaks();
    opts.onUpdate?.({ ...tweaks });
  }

  function setScrollTarget(t: number, from: GlassTweaks, to: GlassTweaks) {
    scrollTarget = Math.min(1, Math.max(0, t));
    scrollBlendFrom = from;
    scrollBlendTo = to;
  }

  function setScrollMorphEnabled(enabled: boolean) {
    scrollMorphEnabled = enabled;
  }

  /** Bind the sticky runway so every frame can read scrollY → target (no missed events). */
  function bindScrollTrack(el: HTMLElement | null, from: GlassTweaks, to: GlassTweaks) {
    scrollTrack = el;
    scrollBlendFrom = from;
    scrollBlendTo = to;
  }

  function readScrollTargetFromDom() {
    if (scrollTrack) {
      const max = Math.max(0, scrollTrack.offsetHeight - window.innerHeight);
      if (max > 8) {
        scrollTarget = Math.min(1, Math.max(0, window.scrollY / max));
        return;
      }
    }
    // No sticky runway left — use first viewport of page scroll for fader parallax.
    scrollTarget = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
  }

  let scrollParallaxY = 0;
  const mouseParallaxTarget = new THREE.Vector2(0, 0);
  const mouseParallaxSmooth = new THREE.Vector2(0, 0);
  // ~5× quieter than the first strong pass — slides only, logo stays put.
  const GYRO_PARALLAX_AMP = 0.022;
  const GYRO_BG_SHIFT = 0.1;
  const GYRO_RANGE = 30;
  /** Critically-damped-ish chase: inertia + ease-in-out stop. */
  const GYRO_SPRING = 9;
  const GYRO_DAMP = 11;
  const MOUSE_PARALLAX_AMP = 0.038;
  const MOUSE_PARALLAX_LAG = 2.6;
  let gyroListening = false;
  let gyroPermissionAsked = false;
  let gyroBaseTilt: number | null = null;
  let lastOrientationAt = 0;
  const bgGyroTarget = new THREE.Vector2(0, 0);
  const bgGyroSmooth = new THREE.Vector2(0, 0);
  const mouseParallaxVel = new THREE.Vector2(0, 0);
  const bgGyroVel = new THREE.Vector2(0, 0);

  function applyParallaxUniforms() {
    background.position.y = 0;
    background.position.x = bgGyroSmooth.x;
    background.rotation.y = 0;
    const p = backgroundMaterial.uniforms.parallax.value as THREE.Vector2;
    // Tilt / mouse on X (opposite); Y is scroll drift only (keeps slide full-height).
    p.set(mouseParallaxSmooth.x, scrollParallaxY);
  }

  function setBackgroundParallax(t: number) {
    const u = Math.min(1, Math.max(0, t));
    const eased = u * u * (3 - 2 * u);
    // Mild upward UV drift — keep slides steady; below-hero content uses its own lift.
    scrollParallaxY = -eased * 0.028;
    applyParallaxUniforms();
  }

  function sampleMouseParallax(clientX: number) {
    if (reducedMotion.matches || gyroListening) return;
    const rect = host.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    // Horizontal only, opposite to cursor.
    mouseParallaxTarget.set(
      THREE.MathUtils.clamp(nx * MOUSE_PARALLAX_AMP, -MOUSE_PARALLAX_AMP, MOUSE_PARALLAX_AMP),
      0,
    );
  }

  function heroMostlyVisible() {
    const rect = host.getBoundingClientRect();
    return rect.bottom > window.innerHeight * 0.15 && rect.top < window.innerHeight * 0.85;
  }

  function applyGyroTilt(tiltX: number) {
    if (gyroBaseTilt === null) gyroBaseTilt = tiltX;
    const delta = tiltX - gyroBaseTilt;
    const nx = THREE.MathUtils.clamp(delta / GYRO_RANGE, -1, 1);
    // Opposite to tilt → faux volume / window into the scene.
    mouseParallaxTarget.set(
      THREE.MathUtils.clamp(-nx * GYRO_PARALLAX_AMP, -GYRO_PARALLAX_AMP, GYRO_PARALLAX_AMP),
      0,
    );
    bgGyroTarget.set(-nx * GYRO_BG_SHIFT, 0);
  }

  function onDeviceOrientation(event: DeviceOrientationEvent) {
    if (reducedMotion.matches || document.hidden || !heroMostlyVisible()) return;
    if (event.gamma == null && event.beta == null) return;
    const angle = typeof window.orientation === 'number'
      ? window.orientation
      : (screen.orientation?.angle ?? 0);
    let tiltX = event.gamma ?? 0;
    if (angle === 90 || angle === -90) {
      tiltX = event.beta ?? 0;
    }
    lastOrientationAt = performance.now();
    applyGyroTilt(tiltX);
  }

  function onDeviceMotion(event: DeviceMotionEvent) {
    if (reducedMotion.matches || document.hidden || !heroMostlyVisible()) return;
    // Only if orientation stream is missing / dead.
    if (performance.now() - lastOrientationAt < 250) return;
    const g = event.accelerationIncludingGravity;
    if (!g || g.x == null) return;
    applyGyroTilt(g.x * 3.2);
  }

  async function ensureGyro(force = false): Promise<{ ok: boolean; reason?: string }> {
    if (gyroListening) return { ok: true };
    if (!force && !lowPower) return { ok: false, reason: 'desktop' };
    if (reducedMotion.matches) return { ok: false, reason: 'reduced-motion' };
    if (!window.isSecureContext) {
      return { ok: false, reason: 'insecure' };
    }
    if (!force && gyroPermissionAsked) return { ok: false, reason: 'denied' };
    try {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<PermissionState>;
      };
      const DME = DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<PermissionState>;
      };
      // iOS: must run from a user gesture. Android: usually no prompt.
      if (typeof DOE.requestPermission === 'function') {
        const state = await DOE.requestPermission();
        if (state !== 'granted') return { ok: false, reason: 'denied' };
      } else if (typeof DME.requestPermission === 'function') {
        const state = await DME.requestPermission();
        if (state !== 'granted') return { ok: false, reason: 'denied' };
      }
      if (!('DeviceOrientationEvent' in window) && !('DeviceMotionEvent' in window)) {
        return { ok: false, reason: 'unsupported' };
      }
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
      window.addEventListener('devicemotion', onDeviceMotion, { passive: true });
      gyroListening = true;
      gyroPermissionAsked = true;
      gyroBaseTilt = null;
      return { ok: true };
    } catch {
      return { ok: false, reason: 'denied' };
    }
  }

  function onFirstUserGesture() {
    void ensureGyro(true).then(result => {
      if (!result.ok) return;
      window.removeEventListener('pointerdown', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    });
  }

  // Android HTTPS: start immediately. iOS: first tap anywhere arms sensors (no UI button).
  if (lowPower && window.isSecureContext && !reducedMotion.matches) {
    void ensureGyro(true);
    window.addEventListener('pointerdown', onFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', onFirstUserGesture, { passive: true });
  }

  function setDragEnabled(enabled: boolean) {
    dragEnabled = enabled;
    if (!enabled && dragging) {
      dragging = false;
      dragPointerId = null;
    }
    canvas.style.touchAction = enabled ? 'none' : 'pan-y';
    canvas.style.cursor = enabled ? 'grab' : 'default';
  }

  function move(event: PointerEvent) {
    sampleMouseParallax(event.clientX);
    if (!dragEnabled || !dragging || event.pointerId !== dragPointerId) return;
    const { width, height } = worldAtLogoDepth();
    const rect = canvas.getBoundingClientRect();
    logoOffset.x += ((event.clientX - lastDrag.x) / rect.width) * width;
    logoOffset.y -= ((event.clientY - lastDrag.y) / rect.height) * height;
    lastDrag.set(event.clientX, event.clientY);
    applyLogoTransform();
    emitLogoPose();
  }
  function leave() {
    if (dragging) return;
    canvas.style.cursor = dragEnabled ? 'grab' : 'default';
    if (!gyroListening) mouseParallaxTarget.set(0, 0);
  }
  function pointerDown(event: PointerEvent) {
    if (!dragEnabled || event.button !== 0) return;
    if (intro) {
      cancelIntro();
      tweaks.logoX = logoOffset.x;
      tweaks.logoY = logoOffset.y;
    }
    dragging = true;
    dragPointerId = event.pointerId;
    lastDrag.set(event.clientX, event.clientY);
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
    event.preventDefault();
  }
  function pointerUp(event: PointerEvent) {
    if (event.pointerId !== dragPointerId) return;
    dragging = false;
    dragPointerId = null;
    try { canvas.releasePointerCapture(event.pointerId); } catch { /* already released */ }
    canvas.style.cursor = dragEnabled ? 'grab' : 'default';
    emitLogoPose();
  }
  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', leave);
  window.addEventListener('blur', leave);
  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointercancel', pointerUp);
  function resize() {
    const width = host.clientWidth, height = host.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    scaleState.base = (visibleHeight * camera.aspect * logoScreenFraction()) / size.x;
    applyLogoTransform();
    // Plane matches the camera view — cover UVs stay undistorted.
    const backHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - background.position.z);
    background.scale.set(backHeight * camera.aspect, backHeight, 1);
    background.position.y = 0;
    backgroundMaterial.uniforms.aspect.value = camera.aspect;
    setBackgroundParallax(scrollSmooth);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);

  const slideCount = SLIDE_IMAGES.length;
  let current = 0, target = 1, transition = 0, holding = 0, transitioning = false;
  let lastTime = performance.now();
  let elapsed = 0;
  function goTo(index: number) {
    if (disposed || transitioning || index === current) return;
    target = ((index % slideCount) + slideCount) % slideCount;
    backgroundMaterial.uniforms.imageA.value = imageTextures[current];
    backgroundMaterial.uniforms.imageB.value = imageTextures[target];
    syncImageAspect(imageTextures[current]);
    transitioning = true;
    transition = 0;
    onSlide(target);
  }
  function key(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') goTo(current + 1);
    if (event.key === 'ArrowLeft') goTo(current - 1);
  }
  window.addEventListener('keydown', key);
  function animate(now: number) {
    if (disposed) return;
    const dt = Math.min((now - lastTime) / 1000, .06);
    lastTime = now;
    elapsed += dt;

    // Scroll still drives background parallax; logo T1→T2 is intro (or optional scroll morph).
    readScrollTargetFromDom();
    const alpha = 1 - Math.exp(-SCROLL_SMOOTH_RATE * dt);
    scrollSmooth += (scrollTarget - scrollSmooth) * alpha;
    if (Math.abs(scrollTarget - scrollSmooth) < 0.00008) scrollSmooth = scrollTarget;

    if (intro && !dragging) {
      intro.elapsed += dt;
      const raw = Math.min(1, intro.elapsed / intro.duration);
      const eased = sampleIntroEase({ ease: intro.ease, bezier: intro.bezier }, raw);
      const blended = setScrollBlend(eased, intro.from, intro.to);
      if (intro.onUpdate && Math.abs(raw - intro.lastReported) > introReportStep) {
        intro.lastReported = raw;
        intro.onUpdate(blended);
      }
      if (raw >= 1) {
        const done = intro;
        intro = null;
        done.onUpdate?.(blended);
        done.onComplete?.();
      }
    } else if (scrollMorphEnabled && !dragging) {
      setScrollBlend(scrollSmooth, scrollBlendFrom, scrollBlendTo);
    }
    setBackgroundParallax(scrollSmooth);

    if (gyroListening) {
      // Spring-damper: ease-in from rest, ease-out into the stop (inertia).
      const dtClamped = Math.min(dt, 0.05);
      const damp = Math.exp(-GYRO_DAMP * dtClamped);
      mouseParallaxVel.x += (mouseParallaxTarget.x - mouseParallaxSmooth.x) * GYRO_SPRING * dtClamped;
      mouseParallaxVel.y += (mouseParallaxTarget.y - mouseParallaxSmooth.y) * GYRO_SPRING * dtClamped;
      mouseParallaxVel.multiplyScalar(damp);
      mouseParallaxSmooth.x += mouseParallaxVel.x * dtClamped;
      mouseParallaxSmooth.y += mouseParallaxVel.y * dtClamped;
      bgGyroVel.x += (bgGyroTarget.x - bgGyroSmooth.x) * GYRO_SPRING * dtClamped;
      bgGyroVel.y += (bgGyroTarget.y - bgGyroSmooth.y) * GYRO_SPRING * dtClamped;
      bgGyroVel.multiplyScalar(damp);
      bgGyroSmooth.x += bgGyroVel.x * dtClamped;
      bgGyroSmooth.y += bgGyroVel.y * dtClamped;
    } else {
      const mouseAlpha = 1 - Math.exp(-MOUSE_PARALLAX_LAG * dt);
      mouseParallaxSmooth.lerp(mouseParallaxTarget, mouseAlpha);
      bgGyroSmooth.lerp(bgGyroTarget, mouseAlpha);
      mouseParallaxVel.set(0, 0);
      bgGyroVel.set(0, 0);
    }
    applyParallaxUniforms();
    // Soft logo lift — lag behind scroll so motion stays buttery.
    const liftAlpha = reducedMotion.matches ? 1 : 1 - Math.exp(-LOGO_LIFT_LAG * dt);
    logoScrollLiftSmooth += (logoScrollLiftTarget - logoScrollLiftSmooth) * liftAlpha;
    if (!dragging) applyLogoTransform();

    if (onScrollSmooth && Math.abs(scrollSmooth - lastReportedScroll) > 0.008) {
      lastReportedScroll = scrollSmooth;
      onScrollSmooth(scrollSmooth);
    }

    if (document.hidden) return;

    if (transitioning) {
      transition = Math.min(1, transition + dt / (reducedMotion.matches ? .12 : FADE_SECONDS));
      backgroundMaterial.uniforms.fade.value = transition * transition * (3 - 2 * transition);
      if (transition >= 1) {
        current = target;
        transitioning = false;
        holding = 0;
        backgroundMaterial.uniforms.imageA.value = imageTextures[current];
        backgroundMaterial.uniforms.fade.value = 0;
        syncImageAspect(imageTextures[current]);
      }
    } else if (!paused) {
      holding += dt;
      if (holding >= HOLD_SECONDS) goTo(current + 1);
    }
    backgroundMaterial.uniforms.zoom.value = reducedMotion.matches ? 1 : 1.018 + Math.sin(elapsed * .08) * .012;
    renderer.render(scene, camera);
  }
  await renderer.compileAsync(scene, camera);
  resize();
  applyTweaks();
  renderer.render(scene, camera);
  renderer.setAnimationLoop(animate);

  return {
    get paused() { return paused; },
    setPaused(value) { paused = value; },
    goTo,
    step(direction) { goTo(current + direction); },
    getTweaks() { return { ...tweaks }; },
    setTweaks,
    resetTweaks() { return setTweaks({ ...DEFAULT_GLASS_TWEAKS }); },
    setScrollBlend,
    setScrollTarget,
    bindScrollTrack,
    setScrollMorphEnabled,
    playIntro,
    cancelIntro,
    setDragEnabled,
    enableMotionParallax() { return ensureGyro(true); },
    isMotionParallaxActive() { return gyroListening; },
    setBackgroundParallax,
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      window.removeEventListener('devicemotion', onDeviceMotion);
      window.removeEventListener('pointerdown', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      window.removeEventListener('keydown', key);
      model.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      glass.dispose();
      background.geometry.dispose();
      backgroundMaterial.dispose();
      environment.dispose();
      imageTextures.forEach(texture => texture.dispose());
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch {
        /* older browsers */
      }
      renderer.domElement.remove();
    },
  };
}
