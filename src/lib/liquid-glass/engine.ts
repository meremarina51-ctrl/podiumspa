/** Warm ETALON defaults — burgundy / bronze / champagne, emerald-cut lens. */
export type LiquidGlassTweaks = {
  ior: number;
  transmission: number;
  thickness: number;
  dispersion: number;
  roughness: number;
  reflections: number;
  clearcoat: number;
  fresnelPower: number;
  rim: number;
  glow: number;
  dichroic: number;
  spectralSat: number;
  spectralHue: number;
  flareStrength: number;
  specularIntensity: number;
  creamStrength: number;
  flare: string;
  tint: string;
  tintStrength: number;
  /** Emerald selector width in CSS px. */
  lensDiameter: number;
  /** Height = width * lensSquashY (1 = square; <1 = flatter baguette). */
  lensSquashY: number;
  /** Corner chamfer of emerald cut (px). 0 ≈ sharp rectangle; larger → octagon. */
  lensChamfer: number;
  /** Inset of inner emerald (table/facet) from outer rim, px. Larger → smaller inner perimeter. */
  lensFacetInset: number;
  /** Thickness of the inner facet ring, px. */
  lensFacetWidth: number;
  /** Visibility of the inner facet rim (0 = off). */
  lensFacetStrength: number;
  /** Softness / blur of the inner perimeter ring (1 = tight, higher = softer). */
  lensFacetSoft: number;
  /** Strength of crown facet spokes (outer vertex → matching inner vertex). */
  lensFacetSpoke: number;
  /** Thickness of facet spoke lines, px. */
  lensFacetSpokeWidth: number;
  /** Strength of crown wedge fills (8 facets between spokes). */
  lensFacetWedge: number;
  /** Soft edge of each wedge fill, px. */
  lensFacetWedgeSoft: number;
  /** Gradient falloff: higher = sharper white edge, longer fade. */
  lensFacetWedgePower: number;
  /** Shift highlight within each wedge (0 = leading spoke bright → 1 = flipped). */
  lensFacetWedgePhase: number;
  /** Outer white halo / spill opacity around the selector (0 = off). */
  lensHaloAlpha: number;
  /** Dark bar (menu chrome) layout. */
  barWidth: number;
  barHeight: number;
  barRadius: number;
  barOffsetY: number;
  barShadowBlur: number;
  barShadowY: number;
  barShadowAlpha: number;
  /** Inner dark cavity padding from bar edge (px). */
  innerPadX: number;
  innerPadY: number;
  innerRadius: number;
  roomLight: number;
  cavity: number;
  cavityTop: number;
  cavityBottom: number;
  contourStrength: number;
  contourWidth: number;
  contourSoft: number;
  contourColor: string;
  followSpring: number;
  followDamp: number;
  followStretch: number;
  /** Max extra lens width from velocity (px). */
  followStretchMax: number;
  /** Hover blend speed inside lens (higher = snappier). */
  hoverLerp: number;
  /** Elliptical sphere specular on the selector (0 = off). */
  sphereGlint: number;
  /** Vertical radius of the sphere glint ellipse (smaller = flatter). */
  sphereGlintY: number;
  selectedGlow: number;
  selectedGlowSpeed: number;
  selectedGlowSpread: number;
  selectedGlowColor: string;
  /** Outer light-beige rim around the bar. */
  whiteRimColor: string;
  whiteRimAlpha: number;
  whiteRimWidth: number;
  whiteRimInset: number;
  /** Inner depth rim (warm grey/bronze). */
  greyRimColor: string;
  greyRimAlpha: number;
  greyRimWidth: number;
  chromeHi: string;
  chromeMid: string;
  chromeLo: string;
  cavityHi: string;
  cavityLo: string;
  labelColor: string;
  roomLightColor: string;
  /** Mobile burger shell / vertical panel fill. */
  panelBg: string;
  /** Burger icon lines (closed/open X). */
  burgerIconColor: string;
  /** Mobile HTML menu labels. */
  mobileLabelColor: string;
};

/** Baked from Pictures/эталон/liquid-glass-nav-tweaks.json */
export const LIQUID_GLASS_DEFAULTS: LiquidGlassTweaks = {
  ior: 0.37,
  transmission: 1,
  thickness: 2.35,
  dispersion: 0.38,
  roughness: 0.025,
  reflections: 0.72,
  clearcoat: 0.58,
  fresnelPower: 0.55,
  rim: 0.7,
  glow: 0.58,
  dichroic: 0.08,
  spectralSat: 0.45,
  spectralHue: 0.08,
  flareStrength: 1,
  specularIntensity: 1.55,
  creamStrength: 0.72,
  flare: "#ffb070",
  tint: "#f0d8c4",
  tintStrength: 0.14,
  lensDiameter: 201,
  lensSquashY: 1,
  lensChamfer: 18,
  lensFacetInset: 5,
  lensFacetWidth: 1.4,
  lensFacetStrength: 0.85,
  lensFacetSoft: 1.6,
  lensFacetSpoke: 0.75,
  lensFacetSpokeWidth: 1.1,
  lensFacetWedge: 0.7,
  lensFacetWedgeSoft: 1.6,
  lensFacetWedgePower: 1.85,
  lensFacetWedgePhase: 0,
  lensHaloAlpha: 0.5,
  barWidth: 0.95,
  barHeight: 86,
  barRadius: 106,
  barOffsetY: -2,
  barShadowBlur: 25,
  barShadowY: 12,
  barShadowAlpha: 0.4,
  innerPadX: 28,
  innerPadY: 24,
  innerRadius: 45,
  roomLight: 0.42,
  cavity: 0.78,
  cavityTop: 0.85,
  cavityBottom: 0.78,
  contourStrength: 0.72,
  contourWidth: 3.6,
  contourSoft: 1.4,
  contourColor: "#ffe4cc",
  followSpring: 520,
  followDamp: 29.5,
  followStretch: 0,
  followStretchMax: 14,
  hoverLerp: 10,
  sphereGlint: 1.05,
  sphereGlintY: 0.47,
  selectedGlow: 0.82,
  selectedGlowSpeed: 1.2,
  selectedGlowSpread: 0.9,
  selectedGlowColor: "#e8b896",
  whiteRimColor: "#ff9500",
  whiteRimAlpha: 0,
  whiteRimWidth: 4.2,
  whiteRimInset: 0,
  greyRimColor: "#6a4a40",
  greyRimAlpha: 0,
  greyRimWidth: 7.6,
  chromeHi: "#ffffff",
  chromeMid: "#ff5e00",
  chromeLo: "#5a3c32",
  cavityHi: "#000000",
  cavityLo: "#36424e",
  labelColor: "#f5e9e9",
  roomLightColor: "#ffe8d4",
  panelBg: "#a6aba6",
  burgerIconColor: "#1a1210",
  mobileLabelColor: "#16120f",
};

const VERT = `attribute vec2 p; varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;

const FRAG = `#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 uv;
uniform sampler2D background;
uniform vec2 resolution;
uniform vec2 center;
uniform vec2 size;
uniform float power;
uniform float reflections;
uniform float glow;
uniform float lightMode;
uniform float thickness;
uniform float dispersion;
uniform float transmission;
uniform float roughness;
uniform float clearcoat;
uniform float fresnelPower;
uniform float rim;
uniform float dichroic;
uniform float spectralSat;
uniform float spectralHue;
uniform float flareStrength;
uniform float specularIntensity;
uniform float creamStrength;
uniform float tintStrength;
uniform vec3 tint;
uniform vec3 flareColor;
uniform float time;
uniform float cavity;
uniform float cavityTop;
uniform float cavityBottom;
uniform float hoverInside;
uniform float contourStrength;
uniform float contourWidth;
uniform float contourSoft;
uniform vec3 contourColor;
uniform float useBarMask;
uniform vec2 barCenter;
uniform vec2 barHalf;
uniform float sphereGlint;
uniform float sphereGlintY;
uniform float ellipseShape;
uniform float chamfer;
uniform float facetInset;
uniform float facetWidth;
uniform float facetStrength;
uniform float facetSoft;
uniform float facetSpoke;
uniform float facetSpokeWidth;
uniform float facetWedge;
uniform float facetWedgeSoft;
uniform float facetWedgePower;
uniform float facetWedgePhase;
uniform float haloAlpha;
uniform float verticalMode;

float capsule(vec2 p,vec2 b){vec2 q=vec2(p.x-clamp(p.x,-b.x+b.y,b.x-b.y),p.y);return length(q)-b.y;}
/* Emerald / baguette silhouette: AABB ∩ 45° corner cuts → elongated octagon. */
float sdEmerald(vec2 p,vec2 b,float ch){
  p=abs(p);
  float c=clamp(ch,0.,min(b.x,b.y)*.95);
  vec2 d=p-b;
  float dBox=length(max(d,0.))+min(max(d.x,d.y),0.);
  float dCut=(p.x+p.y-(b.x+b.y-c))*0.70710678118;
  return max(dBox,dCut);
}
float sdSeg(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a,ba=b-a;
  float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-5),0.,1.);
  return length(pa-ba*h);
}
float cross2(vec2 a,vec2 b){return a.x*b.y-a.y*b.x;}
/* i = 0..7 clockwise from top-right chamfer corner of emerald. */
vec2 emeraldVert(vec2 b,float ch,float i){
  float c=clamp(ch,0.,min(b.x,b.y)*.95);
  float bx=b.x,by=b.y;
  if(i<0.5) return vec2(bx-c,by);
  if(i<1.5) return vec2(bx,by-c);
  if(i<2.5) return vec2(bx,-(by-c));
  if(i<3.5) return vec2(bx-c,-by);
  if(i<4.5) return vec2(-(bx-c),-by);
  if(i<5.5) return vec2(-bx,-(by-c));
  if(i<6.5) return vec2(-bx,by-c);
  return vec2(-(bx-c),by);
}
/* One crown wedge: trapezoid outer[i]→outer[i+1]→inner[i+1]→inner[i],
   gradient white on leading (left) spoke → transparent toward trailing. */
float crownWedge(vec2 p,vec2 o0,vec2 o1,vec2 i0,vec2 i1,float edgeSoft,float gradPow,float phase){
  float e0=cross2(o1-o0,p-o0);
  float e1=cross2(i1-o1,p-o1);
  float e2=cross2(i0-i1,p-i1);
  float e3=cross2(o0-i0,p-i0);
  float es=max(edgeSoft,.35);
  float inA=smoothstep(es,-es,e0)*smoothstep(es,-es,e1)*smoothstep(es,-es,e2)*smoothstep(es,-es,e3);
  float inB=smoothstep(es,-es,-e0)*smoothstep(es,-es,-e1)*smoothstep(es,-es,-e2)*smoothstep(es,-es,-e3);
  float inside=max(inA,inB);
  float dL=sdSeg(p,o0,i0);
  float dR=sdSeg(p,o1,i1);
  float u=clamp(dL/max(dL+dR,1e-4),0.,1.);
  u=fract(u+clamp(phase,0.,1.));
  float grad=pow(1.-u,max(gradPow,.35));
  return inside*grad;
}
vec4 readAt4(vec2 p){return texture2D(background,clamp(p/resolution,vec2(.001),vec2(.999)));}
vec3 readAt(vec2 p){return readAt4(p).rgb;}
void main(){
vec2 pixel=vec2(uv.x,1.-uv.y)*resolution;vec2 p=pixel-center;
float rx=max(size.x*.5,1.);float ry=max(size.y*.5,1.);
vec2 halfExt=vec2(rx,ry);
vec2 q;float radial;float d;float r;
if(ellipseShape>.5){
  /* Emerald cut (rectangular ruby silhouette) */
  d=sdEmerald(p,halfExt,chamfer);
  float depth=max(min(rx,ry)*.65,2.);
  radial=1.-clamp(-d/depth,0.,1.);
  q=p;
  r=min(rx,ry);
}else{
  r=ry;float segment=max(0.,rx-r);q=vec2(p.x-clamp(p.x,-segment,segment),p.y);radial=length(q)/r;d=length(q)-r;
}
/* atan(0,0) is unstable — caused 1px center flicker while the lens moves */
float qLen=length(q);
float ang=qLen>1.25?atan(q.y,q.x):0.;
vec4 baseTex=readAt4(pixel);vec3 base=baseTex.rgb;float baseA=baseTex.a;
/* itemLens: hero is in RGB for refraction, but only the wine pill may paint outside the lens */
float onBar=useBarMask>.5?1.-smoothstep(-.5,1.5,capsule(pixel-barCenter,barHalf)):1.;
float chromeA=baseA*onBar;
/* Capsule shadow aliases a 1px horizontal midline on wide emeralds — use SDF match */
float outsideShadow=ellipseShape>.5
  ?exp(-max(sdEmerald(p-vec2(0.,6.),halfExt,chamfer),0.)*.13)*smoothstep(-1.,2.,d)*.16
  :exp(-max(capsule(p-vec2(0.,7.),size*.5),0.)*.13)*smoothstep(-1.,2.,d)*.19;
float spill=exp(-max(d,0.)*.055)*smoothstep(-1.,5.,d)*glow*haloAlpha;
float shadowA=max(outsideShadow*.55,spill*.35);

float cw=max(contourWidth,.15);
float cs=max(contourSoft,.2);
float outerRing=exp(-pow(max(d,0.)/cw,2./cs))*smoothstep(-1.5,2.5,d);
float lip=exp(-pow((d+.85)/(cw*.55*cs),2.));
base=mix(base,base*(1.-outsideShadow),chromeA);
base+=spill*flareColor*chromeA;
base+=contourColor*outerRing*contourStrength*.55*chromeA;

/* Analytic AA — contourSoft widens the silhouette blur */
float aaW=max(fwidth(d),0.7)*(0.45+contourSoft*1.55);
float glassMask=1.-smoothstep(-aaW,aaW*1.85,d);

if(glassMask<0.002){
  float a=max(chromeA,shadowA);
  vec3 col=mix(vec3(0.),base,chromeA)+flareColor*spill*.4;
  if(verticalMode>.5){
    vec2 lightDir0=normalize(vec2(-.72,-.68));
    float rimLit0=.5+.5*dot(normalize(p+vec2(.001)),lightDir0);
    float nearRim0=exp(-pow(max(d,0.)/3.8,2.))*smoothstep(-1.2,2.2,d);
    vec3 nearRimCol0=mix(vec3(.04,.015,.025),vec3(1.),smoothstep(.15,.9,rimLit0));
    float dCast0=ellipseShape>.5
      ?sdEmerald(p-vec2(7.,9.),halfExt*1.02,chamfer)
      :(length(vec2(p.x-clamp(p.x,-(rx-ry),rx-ry),p.y)-vec2(7.,9.))-ry);
    float castSh0=smoothstep(16.,0.,max(dCast0,0.))*.42;
    col=mix(col,nearRimCol0,nearRim0*.85);
    col*=1.-castSh0;
    gl_FragColor=vec4(col,max(a,max(nearRim0*.55,castSh0*.35)));
  }else{
    gl_FragColor=vec4(col,a);
  }
  return;
}
float z=sqrt(max(.001,1.-min(radial*radial,.999)));
vec3 n;
if(ellipseShape>.5){
  float e=.55;
  float gx=sdEmerald(p+vec2(e,0.),halfExt,chamfer)-sdEmerald(p-vec2(e,0.),halfExt,chamfer);
  float gy=sdEmerald(p+vec2(0.,e),halfExt,chamfer)-sdEmerald(p-vec2(0.,e),halfExt,chamfer);
  n=normalize(vec3(gx/(2.*e),gy/(2.*e),z*1.45/r));
}else{
  n=normalize(vec3(q/r,z*1.65));
}
float bend=power*thickness;
vec2 displacement=-q*(.16+.54*pow(clamp(radial,0.,1.),3.))*bend;
displacement.x+=-p.x*.15*bend;
/* Light/mobile: pin horizontal so glyphs don't jump left; keep vertical warp */
if(lightMode>.5){
  displacement.x*=.05;
}
float roughJitter=roughness*8.;
vec2 sampleP=pixel+displacement+vec2(roughJitter*.35,-roughJitter*.2);
float edge=pow(clamp(radial,0.,1.),5.);
vec2 chroma=normalize(q+vec2(.001))*dispersion*edge*bend;
vec3 glass=vec3(
  readAt(sampleP+chroma).r,
  readAt(sampleP).g,
  readAt(sampleP-chroma).b
);
glass=mix(glass,readAt(sampleP+vec2(0.,.7)),edge*.18);
glass*=mix(vec3(.96,.985,1.),vec3(.975,.988,1.),lightMode);
glass=mix(glass,tint,tintStrength*(1.-edge)*.85);
glass=mix(glass,flareColor,creamStrength*edge*.35);

float fresnel=.035+.72*pow(1.-z,fresnelPower);
vec3 reflected=reflect(vec3(0.,0.,-1.),n);
float topLight=exp(-pow((reflected.y+.62)/.20,2.))*exp(-pow((reflected.x+.28)/1.4,2.));
float lowerLight=exp(-pow((reflected.y-.82)/.085,2.))*exp(-pow((reflected.x-.2)/1.5,2.));
float sideLight=exp(-pow((reflected.x+.84)/.11,2.)-pow((reflected.y+.16)/.85,2.));
/* Mobile: TL warmer/oranger; BR white ~half */
float tlBoost=verticalMode>.5?1.35:1.;
float brFade=verticalMode>.5?.5:1.;
float reflAmt=reflections*(.55+clearcoat*.7)*specularIntensity;
glass=mix(glass,vec3(.85,.9,.98),fresnel*.38*reflAmt);
glass+=(topLight*.26*tlBoost+lowerLight*.21*brFade+sideLight*.18)*reflAmt;
vec3 tlFlare=verticalMode>.5?mix(flareColor,vec3(1.,.48,.14),.55):flareColor;
glass+=tlFlare*(topLight*.5*tlBoost+sideLight*.25)*flareStrength*reflections;

/* Sphere glint — elliptical specular from top-left toward bottom-right */
vec2 pn=ellipseShape>.5?vec2(p.x/rx,p.y/ry):q/max(r,1.);
vec2 hl=pn-vec2(-.42,-.48);
float hcs=.70710678;float hsn=.70710678;
vec2 hlr=vec2(hcs*hl.x-hsn*hl.y,hsn*hl.x+hcs*hl.y);
float sy=max(.06,sphereGlintY);
float ball=exp(-(hlr.x*hlr.x)/(.055)-(hlr.y*hlr.y)/(sy*sy));
ball*=smoothstep(1.02,.22,radial)*sphereGlint;
vec3 ballCol=verticalMode>.5?mix(vec3(.96,.98,1.),vec3(1.,.55,.22),.42):vec3(.96,.98,1.);
glass+=ballCol*ball*(.5+clearcoat*.55)*reflections*(verticalMode>.5?.9:1.);
glass+=tlFlare*ball*flareStrength*.7;
/* Soft secondary streak — off on emerald (item lens); soft on capsule */
float streakW=.042;
float streak=exp(-(hlr.x*hlr.x)/streakW-(hlr.y*hlr.y)/(sy*sy*2.5))*smoothstep(.95,.15,radial)*sphereGlint*.45;
float streakAmt=ellipseShape>.5?0.:1.;
glass+=vec3(1.)*streak*(.25+clearcoat*.35)*reflections*streakAmt*brFade;

float phase=fract(ang*.15+radial*.8+spectralHue);
vec3 spectrum=vec3(
  .55+.45*sin(phase*6.283),
  .55+.45*sin(phase*6.283+2.094),
  .55+.45*sin(phase*6.283+4.188)
);
spectrum=mix(vec3(dot(spectrum,vec3(.333))),spectrum,spectralSat);
glass=mix(glass,spectrum,edge*dichroic*fresnel);

float emit=smoothstep(.42,.92,dot(glass,vec3(.299,.587,.114)));
float play=.5+.5*sin(time*2.4+radial*7.0+ang*2.0);
glass+=spectrum*emit*play*.22*(.55+dichroic*.45);
glass+=flareColor*emit*(.08+.12*play);

float ny=clamp(p.y/r,-1.2,1.2);
float cavAmt=cavity*(.42+.58*hoverInside);
float midShade=(1.-edge)*smoothstep(0.,.85,1.-abs(ny)*.55)*smoothstep(.15,.55,radial);
glass-=vec3(.11,.1,.09)*cavAmt*midShade*.9;
vec3 bandCol=mix(vec3(.93,.96,1.),flareColor,.12);
float topBand=exp(-pow((ny+.68)/.2,2.))*(1.-radial*.4);
float botBand=exp(-pow((ny-.74)/.22,2.))*(1.-radial*.4);
float hoverBoost=.65+.35*hoverInside;
glass+=bandCol*topBand*cavityTop*cavAmt*hoverBoost;
glass+=bandCol*botBand*cavityBottom*cavAmt*hoverBoost*.96;
float bowl=pow(clamp(radial,0.,1.),2.2)*(1.-edge);
glass-=vec3(.06)*cavAmt*bowl;
glass+=bandCol*bowl*cavAmt*.12*hoverBoost;

glass+=contourColor*lip*contourStrength*(.35+.25*hoverInside);

float rimMask=exp(-pow((d+.9)/.9,2.));
float directional=.28+.72*max(0.,dot(normalize(q+vec2(.001)),normalize(vec2(-.5,-.8))));
glass+=rimMask*directional*rim*reflAmt;

/* Facets off — midplane hairline (mobile permanent / desktop seam). Capsule keeps soft inner. */
if(ellipseShape<.5){
  float inner=exp(-pow((d+3.0)/1.7,2.));glass*=1.-inner*.17;
}

/* Mobile only: near contact rim TL white → BR dark + cast shadow from TL light */
float nearRim=0.;
float castSh=0.;
vec3 nearRimCol=vec3(0.);
float rimLit=0.;
if(verticalMode>.5){
  vec2 lightDir=normalize(vec2(-.72,-.68));
  rimLit=.5+.5*dot(normalize(p+vec2(.001)),lightDir);
  nearRim=exp(-pow(max(d,0.)/3.8,2.))*smoothstep(-1.2,2.2,d);
  nearRimCol=mix(vec3(.04,.015,.025),vec3(1.),smoothstep(.15,.9,rimLit));
  float dCast=ellipseShape>.5
    ?sdEmerald(p-vec2(7.,9.),halfExt*1.02,chamfer)
    :(length(vec2(p.x-clamp(p.x,-(rx-ry),rx-ry),p.y)-vec2(7.,9.))-ry);
  castSh=smoothstep(16.,0.,max(dCast,0.))*smoothstep(-2.,4.,dCast)*.42;
}

float cover=glassMask*transmission;
float outA=max(chromeA,max(shadowA*(1.-glassMask*.9),cover));
vec3 col=mix(base,glass,cover);
if(verticalMode>.5){
  col=mix(col,nearRimCol,nearRim*(1.-glassMask*.55)*.85);
  col*=1.-castSh*(1.-glassMask*.75);
  col+=nearRimCol*nearRim*glassMask*.12*rimLit;
  outA=max(outA,max(nearRim*.55,castSh*.35));
}
gl_FragColor=vec4(col,outA);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255) as [number, number, number];
}

function hexAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex).map((v) => Math.round(v * 255));
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alpha))})`;
}

export interface LiquidGlassNavOptions {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  getButtons: () => HTMLElement[];
  initialActive: number;
  light?: boolean;
  /** Horizontal bar (desktop) or vertical stack (mobile burger panel). */
  orientation?: "horizontal" | "vertical";
  /** Skip canvas labels — HTML links render text (HeroAir). */
  domLabels?: boolean;
  /** Glass capsule sized to each menu item (pill selector on top nav). */
  itemLens?: boolean;
  /** When pointer is inside the selector, numeric fields lerp toward this preset. */
  hoverTweaks?: LiquidGlassTweaks | null;
  /** Only these keys lerp on hover (defaults: all numeric diffs vs hoverTweaks). */
  hoverBlendKeys?: (keyof LiquidGlassTweaks)[];
  onContextLost?: () => void;
  onLayout?: (layout: LiquidGlassLayout) => void;
  /** Ancestor selector for the bar-mask geometry (falls back to closest("nav")). */
  pillSelector?: string;
}

export type LiquidGlassLayout = {
  stageHeight: number;
  /** CSS px inset from stage edges for hit links. */
  linksLeft: number;
  linksRight: number;
  linksTop: number;
  linksHeight: number;
};

export interface LiquidGlassNavHandle {
  setActive(i: number): void;
  setLabels(labels: string[]): void;
  setTarget(i: number): void;
  getTweaks(): LiquidGlassTweaks;
  setTweaks(partial: Partial<LiquidGlassTweaks>): void;
  setHoverTweaks(next: LiquidGlassTweaks | null, keys?: (keyof LiquidGlassTweaks)[]): void;
  resetTweaks(): void;
  getLayout(): LiquidGlassLayout;
  destroy(): void;
}

function mixGlassTweaks(
  base: LiquidGlassTweaks,
  hover: LiquidGlassTweaks | null,
  t: number,
  keys: (keyof LiquidGlassTweaks)[] | null,
): LiquidGlassTweaks {
  if (!hover || t < 0.0005) return base;
  if (t > 0.9995 && !keys) return { ...hover };
  const out: LiquidGlassTweaks = { ...base };
  const list =
    keys ??
    (Object.keys(base) as (keyof LiquidGlassTweaks)[]).filter((k) => {
      const a = base[k];
      const b = hover[k];
      return typeof a === "number" && typeof b === "number" && a !== b;
    });
  const u = Math.max(0, Math.min(1, t));
  for (const k of list) {
    const a = base[k];
    const b = hover[k];
    if (typeof a === "number" && typeof b === "number") {
      (out as Record<string, number | string>)[k as string] = a + (b - a) * u;
    }
  }
  return out;
}

export function mountLiquidGlassNav(opts: LiquidGlassNavOptions): LiquidGlassNavHandle {
  const {
    canvas,
    stage,
    getButtons,
    initialActive,
    light: lightOpt = false,
    orientation = "horizontal",
    domLabels = false,
    itemLens = false,
    hoverTweaks: hoverTweaksOpt = null,
    hoverBlendKeys: hoverBlendKeysOpt = null,
    onContextLost: onContextLostOpt,
    onLayout: onLayoutOpt,
    pillSelector,
  } = opts;
  const vertical = orientation === "vertical";
  // alpha:true — overlay on hero; never loseContext on destroy (Strict Mode remount
  // would otherwise leave a permanent blank white canvas on the same element).
  let glRaw = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  });
  if (glRaw?.isContextLost()) {
    glRaw.getExtension("WEBGL_lose_context")?.restoreContext();
    glRaw = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
  }
  if (!glRaw || glRaw.isContextLost()) {
    throw new Error("WebGL is not supported");
  }
  const gl: WebGLRenderingContext = glRaw;
  gl.getExtension("OES_standard_derivatives");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const tweaks: LiquidGlassTweaks = { ...LIQUID_GLASS_DEFAULTS };
  let hoverTweaks: LiquidGlassTweaks | null = hoverTweaksOpt ? { ...hoverTweaksOpt } : null;
  let hoverBlendKeys: (keyof LiquidGlassTweaks)[] | null = hoverBlendKeysOpt
    ? [...hoverBlendKeysOpt]
    : null;
  let labels: string[] = getButtons().map((_, i) => String(i));
  const light = lightOpt;

  function shader(type: number, src: string) {
    const s = gl.createShader(type);
    if (!s) throw new Error("Failed to create shader");
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) ?? "Shader compile failed");
    }
    return s;
  }

  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed");
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U: Record<string, WebGLUniformLocation | null> = {};
  for (const key of [
    "background",
    "resolution",
    "center",
    "size",
    "power",
    "reflections",
    "glow",
    "lightMode",
    "thickness",
    "dispersion",
    "transmission",
    "roughness",
    "clearcoat",
    "fresnelPower",
    "rim",
    "dichroic",
    "spectralSat",
    "spectralHue",
    "flareStrength",
    "specularIntensity",
    "creamStrength",
    "tintStrength",
    "tint",
    "flareColor",
    "time",
    "cavity",
    "cavityTop",
    "cavityBottom",
    "hoverInside",
    "contourStrength",
    "contourWidth",
    "contourSoft",
    "contourColor",
    "useBarMask",
    "barCenter",
    "barHalf",
    "sphereGlint",
    "sphereGlintY",
    "ellipseShape",
    "chamfer",
    "facetInset",
    "facetWidth",
    "facetStrength",
    "facetSoft",
    "facetSpoke",
    "facetSpokeWidth",
    "facetWedge",
    "facetWedgeSoft",
    "facetWedgePower",
    "facetWedgePhase",
    "haloAlpha",
    "verticalMode",
  ]) {
    U[key] = gl.getUniformLocation(program, key);
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const source = document.createElement("canvas");
  const ctxRaw = source.getContext("2d");
  if (!ctxRaw) throw new Error("2D canvas context unavailable");
  const ctx: CanvasRenderingContext2D = ctxRaw;

  let W = 1;
  let H = 1;
  let x = 0;
  let v = 0;
  let target = 0;
  let active = initialActive;
  let buttonWidth = 1;
  let buttonHeight = 1;
  let cx = 125;
  let cy = 125;
  let hoverIndex = -1;
  let shapeBlend = 0; // 0 = circle (idle/selected), 1 = capsule (hover)
  let suppressHover = false; // after click → circle until pointer leaves nav
  let animTime = 0;
  const pointer = { x: -9999, y: -9999 };
  let hoverSmooth = 0;
  let rafId = 0;
  let destroyed = false;

  function itemCount() {
    return Math.max(1, getButtons().length);
  }

  function rounded(rx: number, ry: number, rw: number, rh: number, rr: number) {
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, rr);
  }

  function capsuleDist(px: number, py: number, cx: number, cy0: number, w: number, h: number) {
    const rr = h * 0.5;
    const segment = Math.max(0, w * 0.5 - rr);
    const dx = px - cx;
    const dy = py - cy0;
    const qx = dx - Math.max(-segment, Math.min(segment, dx));
    return Math.hypot(qx, dy) - rr;
  }

  function drawSelectedGlowText(label: string, tx: number, ty: number) {
    const strength = tweaks.selectedGlow;
    if (strength <= 0.001) {
      ctx.fillStyle = light ? "#11161d" : "#f4f7ff";
      ctx.fillText(label, tx, ty);
      return;
    }
    const speed = tweaks.selectedGlowSpeed;
    const spread = tweaks.selectedGlowSpread;
    const glowRgb = hexToRgb(tweaks.selectedGlowColor);
    const pulse = 0.52 + 0.48 * Math.sin(animTime * speed * 1.35);
    const pulse2 = 0.52 + 0.48 * Math.sin(animTime * speed * 2.1 + 1.35);
    const breath = 0.55 + 0.45 * Math.sin(animTime * speed * 0.72 + 0.4);
    const glowCss = tweaks.selectedGlowColor;
    const r = Math.round(glowRgb[0] * 255);
    const gch = Math.round(glowRgb[1] * 255);
    const b = Math.round(glowRgb[2] * 255);

    const haloR = (38 + 42 * breath) * spread * Math.max(0.35, strength);
    const halo = ctx.createRadialGradient(tx, ty, 2, tx, ty, haloR);
    halo.addColorStop(0, `rgba(${r},${gch},${b},${0.55 * strength * pulse})`);
    halo.addColorStop(0.35, `rgba(${r},${gch},${b},${0.22 * strength * breath})`);
    halo.addColorStop(1, `rgba(${r},${gch},${b},0)`);
    ctx.save();
    ctx.globalCompositeOperation = light ? "source-over" : "lighter";
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.ellipse(tx, ty, haloR * 1.35, haloR * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 3; i++) {
      const t = i / 2;
      ctx.globalAlpha = (0.22 + 0.28 * pulse) * strength * (1 - t * 0.35);
      ctx.shadowColor = glowCss;
      ctx.shadowBlur = (12 + 32 * breath * spread) * (1 + t);
      ctx.fillStyle = `rgb(${r},${gch},${b})`;
      ctx.fillText(
        label,
        tx + Math.sin(animTime * speed + i) * 0.7,
        ty + Math.cos(animTime * speed * 1.3 + i) * 0.45,
      );
    }
    ctx.globalAlpha = (0.16 + 0.34 * pulse2) * strength;
    ctx.shadowBlur = 8 + 18 * pulse2 * spread;
    ctx.fillStyle = glowCss;
    ctx.fillText(label, tx, ty);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = glowCss;
    ctx.shadowBlur = (5 + 16 * pulse) * strength * spread;
    const core = light
      ? tweaks.mobileLabelColor || tweaks.labelColor || "#111111"
      : `rgb(${Math.round(235 + glowRgb[0] * 20)},${Math.round(220 + glowRgb[1] * 25)},${Math.round(200 + glowRgb[2] * 30)})`;
    ctx.fillStyle = core;
    ctx.fillText(label, tx, ty);
    ctx.restore();
  }

  function buttonMetrics() {
    const stageRect = canvas.getBoundingClientRect();
    return getButtons().map((b) => {
      const r = b.getBoundingClientRect();
      return {
        cx: r.left + r.width / 2 - stageRect.left,
        cy: r.top + r.height / 2 - stageRect.top,
        w: Math.max(8, r.width),
        h: Math.max(8, r.height),
      };
    });
  }

  function pillRectLocal() {
    const stageRect = canvas.getBoundingClientRect();
    const pill =
      (pillSelector && (getButtons()[0]?.closest(pillSelector) as HTMLElement | null)) ||
      (getButtons()[0]?.closest("nav") as HTMLElement | null) ||
      (getButtons()[0]?.parentElement as HTMLElement | null);
    if (!pill) {
      return { sx: 0, sy: Math.max(0, (H - 48) / 2), barW: W, barH: Math.min(H, 48) };
    }
    const r = pill.getBoundingClientRect();
    return {
      sx: r.left - stageRect.left,
      sy: r.top - stageRect.top,
      barW: Math.max(40, r.width),
      barH: Math.max(28, r.height),
    };
  }

  /** Sample live hero WebGL into source (CSS px; caller has ctx transform = dpr). */
  function captureHeroBackdrop() {
    const hero =
      (document.querySelector(".glass-hero-scene canvas") as HTMLCanvasElement | null) ||
      (document.querySelector(".glass-hero canvas") as HTMLCanvasElement | null);
    if (!hero || hero.width < 2 || hero.height < 2) return false;
    const heroRect = hero.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const dx = heroRect.left - canvasRect.left;
    const dy = heroRect.top - canvasRect.top;
    const dw = heroRect.width;
    const dh = heroRect.height;
    try {
      ctx.drawImage(hero, 0, 0, hero.width, hero.height, dx, dy, dw, dh);
      return true;
    } catch {
      return false;
    }
  }

  function barGeom() {
    if (itemLens && !vertical) {
      const pill = pillRectLocal();
      const padX = Math.max(2, Math.min(tweaks.innerPadX, pill.barW * 0.2));
      const padY = Math.max(2, Math.min(tweaks.innerPadY, pill.barH * 0.35));
      const sx = pill.sx;
      const sy = pill.sy;
      const barW = pill.barW;
      const barH = pill.barH;
      const radius = Math.min(tweaks.barRadius, Math.min(barW, barH) / 2);
      const ix = sx + padX;
      const iy = sy + padY;
      const iw = Math.max(24, barW - padX * 2);
      const ih = Math.max(16, barH - padY * 2);
      const ir = Math.max(0, Math.min(tweaks.innerRadius, ih / 2));
      return { sx, sy, barW, barH, radius, ix, iy, iw, ih, ir };
    }
    if (itemLens && vertical) {
      /* Full-bleed overlay — no desktop pill/capsule geom (no side roundings). */
      const padT = Math.max(72, Math.min(100, H * 0.12));
      const padB = Math.max(36, H * 0.06);
      const sx = 0;
      const sy = 0;
      const barW = W;
      const barH = H;
      const radius = 0;
      const ix = W * 0.08;
      const iy = padT;
      const iw = Math.max(48, W * 0.84);
      const ih = Math.max(80, H - padT - padB);
      const ir = 0;
      return { sx, sy, barW, barH, radius, ix, iy, iw, ih, ir };
    }
    if (vertical) {
      const padL = 28;
      const padT = 10;
      const padB = 10;
      const padR = 0;
      const sx = padL;
      const sy = padT;
      const barW = Math.max(80, W - padL - padR);
      const barH = Math.max(80, H - padT - padB);
      const radius = Math.min(tweaks.barRadius, Math.min(barW, barH) / 2);
      const padX = Math.max(4, Math.min(tweaks.innerPadX, barW * 0.35));
      const padY = Math.max(4, Math.min(tweaks.innerPadY, barH * 0.2));
      const ix = sx + padX;
      const iy = sy + padY;
      const iw = Math.max(40, barW - padX - Math.min(padX, 8));
      const ih = Math.max(40, barH - padY * 2);
      const ir = Math.max(0, Math.min(tweaks.innerRadius, Math.min(iw, ih) / 2));
      return { sx, sy, barW, barH, radius, ix, iy, iw, ih, ir };
    }
    const barW = Math.min(W, Math.max(120, W * tweaks.barWidth));
    const sx = (W - barW) / 2;
    const barH = Math.max(40, tweaks.barHeight);
    const sy = cy - barH / 2 + tweaks.barOffsetY;
    const radius = Math.max(0, Math.min(tweaks.barRadius, barH / 2));
    const padX = Math.max(4, Math.min(tweaks.innerPadX, barW * 0.45));
    const padY = Math.max(2, Math.min(tweaks.innerPadY, barH * 0.45));
    const ix = sx + padX;
    const iy = sy + padY;
    const iw = Math.max(40, barW - padX * 2);
    const ih = Math.max(24, barH - padY * 2);
    const ir = Math.max(0, Math.min(tweaks.innerRadius, ih / 2));
    return { sx, sy, barW, barH, radius, ix, iy, iw, ih, ir };
  }

  function computeLayout(): LiquidGlassLayout {
    const g = barGeom();
    if (vertical) {
      return {
        stageHeight: Math.ceil(H),
        linksLeft: g.ix,
        linksRight: Math.max(0, W - g.ix - g.iw),
        linksTop: g.iy,
        linksHeight: g.ih,
      };
    }
    const needed = Math.max(
      g.barH + Math.abs(tweaks.barOffsetY) * 2 + 48,
      tweaks.lensDiameter + 48,
      220,
    );
    return {
      stageHeight: Math.ceil(needed),
      linksLeft: g.ix,
      linksRight: Math.max(0, W - g.ix - g.iw),
      linksTop: g.iy,
      linksHeight: g.ih,
    };
  }

  function emitLayout() {
    onLayoutOpt?.(computeLayout());
  }

  function drawBackground() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    source.width = Math.round(W * ratio);
    source.height = Math.round(H * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Menu glass: sample live hero so the overhanging lens refracts the slider.
    if (itemLens && !vertical) {
      if (!captureHeroBackdrop()) {
        ctx.fillStyle = "#170d14"; // --surface
        ctx.fillRect(0, 0, W, H);
      }
    }

    const { sx, sy, barW, barH, radius, ix, iy, iw, ih, ir } = barGeom();

    if (vertical && itemLens) {
      /* Mobile overlay: soft wine gradient — no desktop bar chrome / cavity contours. */
      const base = tweaks.panelBg || tweaks.cavityLo || "#6e1f2c";
      const hi = tweaks.cavityHi || "#a84858";
      const lo = tweaks.chromeMid || "#2a0a12";
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
      g.addColorStop(0, hexAlpha(hi, 0.72));
      g.addColorStop(0.42, hexAlpha(base, 0.35));
      g.addColorStop(1, hexAlpha(lo, 0.55));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    } else if (vertical && !itemLens) {
      // Solid panel fill (wine / panelBg) — legacy mobile capsule mode.
      const base = tweaks.panelBg || "#6e1f2c";
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);
      const gx = W * 0.92;
      const gy = H * 0.04;
      const eg = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.85);
      eg.addColorStop(0, hexAlpha("#ffffff", 0.12));
      eg.addColorStop(0.45, hexAlpha("#ffffff", 0.03));
      eg.addColorStop(1, hexAlpha("#000000", 0.18));
      ctx.fillStyle = eg;
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.save();
      ctx.shadowColor = light
        ? "#7b849844"
        : hexAlpha("#1a0808", tweaks.barShadowAlpha);
      ctx.shadowBlur = Math.max(0, tweaks.barShadowBlur);
      ctx.shadowOffsetY = tweaks.barShadowY;
      rounded(sx, sy, barW, barH, radius);
      let g = ctx.createLinearGradient(0, sy, 0, sy + barH);
      g.addColorStop(0, light ? "#f4f5f7" : tweaks.chromeHi);
      g.addColorStop(0.5, light ? "#c9cdd3" : tweaks.chromeMid);
      g.addColorStop(1, light ? "#b7bdc5" : tweaks.chromeLo);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();

      const inset = Math.max(0, tweaks.whiteRimInset);
      rounded(
        sx + inset,
        sy + inset,
        barW - inset * 2,
        barH - inset * 2,
        Math.max(0, radius - inset),
      );
      ctx.strokeStyle = light
        ? "#fff9"
        : hexAlpha(tweaks.whiteRimColor, tweaks.whiteRimAlpha);
      ctx.lineWidth = Math.max(0, tweaks.whiteRimWidth);
      ctx.stroke();

      rounded(ix, iy, iw, ih, ir);
      g = ctx.createLinearGradient(0, iy, 0, iy + ih);
      g.addColorStop(0, light ? "#bfc5ce" : tweaks.cavityHi);
      g.addColorStop(1, light ? "#d9dde3" : tweaks.cavityLo);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = light
        ? "#87909d66"
        : hexAlpha(tweaks.greyRimColor, tweaks.greyRimAlpha);
      ctx.lineWidth = Math.max(0, tweaks.greyRimWidth);
      ctx.stroke();

      if (tweaks.roomLight > 0.001) {
        ctx.save();
        rounded(sx, sy, barW, barH, radius);
        ctx.clip();
        const room = ctx.createLinearGradient(0, sy, 0, sy + barH);
        const a0 = Math.min(1, tweaks.roomLight);
        const [rr, rg, rb] = hexToRgb(tweaks.roomLightColor).map((v) => Math.round(v * 255));
        room.addColorStop(0, `rgba(${rr},${rg},${rb},${a0})`);
        room.addColorStop(0.38, `rgba(${rr},${rg},${rb},${a0 * 0.42})`);
        room.addColorStop(0.72, `rgba(${rr},${rg},${rb},${a0 * 0.1})`);
        room.addColorStop(1, `rgba(${rr},${rg},${rb},0)`);
        ctx.fillStyle = room;
        ctx.fillRect(sx, sy, barW, barH);
        ctx.restore();
      }
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const n = itemCount();
    if (!domLabels) {
      if (vertical && itemLens) {
        const fill = light ? tweaks.mobileLabelColor || "#16120f" : tweaks.labelColor;
        const fontSize = Math.max(15, Math.min(24, iw * 0.085));
        ctx.textAlign = "center";
        ctx.font = `700 ${fontSize}px Gatchina, "Times New Roman", Times, serif`;
        ctx.letterSpacing = "0.04em";
        for (let i = 0; i < n; i++) {
          const label = (labels[i] ?? "").toUpperCase();
          const tx = ix + iw / 2;
          const ty = iy + buttonHeight * (i + 0.5);
          if (i === active) drawSelectedGlowText(label, tx, ty);
          else {
            ctx.fillStyle = fill;
            ctx.fillText(label, tx, ty);
          }
        }
      } else if (vertical) {
        // Left-aligned labels; ~20% smaller than the previous mobile size.
        const fill = light ? tweaks.mobileLabelColor || "#16120f" : tweaks.labelColor;
        const fontSize = Math.max(16, Math.min(26, W * 0.055));
        const textPad = 14;
        ctx.textAlign = "left";
        ctx.font = `700 ${fontSize}px Gatchina, "Times New Roman", Times, serif`;
        for (let i = 0; i < n; i++) {
          const label = (labels[i] ?? "").toUpperCase();
          const tx = ix + textPad;
          const ty = iy + buttonHeight * (i + 0.5);
          if (i === active) drawSelectedGlowText(label, tx, ty);
          else {
            ctx.fillStyle = fill;
            ctx.fillText(label, tx, ty);
          }
        }
        ctx.textAlign = "center";
      } else if (itemLens) {
        const metrics = buttonMetrics();
        const fill = light ? "#222831" : tweaks.labelColor;
        const fontSize = Math.max(10, Math.min(16, (metrics[0]?.h ?? buttonHeight) * 0.38));
        ctx.font = `700 ${fontSize}px Gatchina, "Times New Roman", Times, serif`;
        ctx.letterSpacing = "0.05em";
        for (let i = 0; i < n; i++) {
          const label = (labels[i] ?? "").toUpperCase();
          const m = metrics[i];
          const tx = m?.cx ?? ix + buttonWidth * (i + 0.5);
          const ty = m?.cy ?? iy + ih / 2;
          if (i === active) drawSelectedGlowText(label, tx, ty);
          else {
            ctx.fillStyle = fill;
            ctx.fillText(label, tx, ty);
          }
        }
      } else {
        ctx.font = `600 ${Math.max(12, Math.min(19, W * 0.022))}px Arial`;
        for (let i = 0; i < n; i++) {
          const label = (labels[i] ?? "").toUpperCase();
          const tx = ix + buttonWidth * (i + 0.5);
          const ty = iy + ih / 2;
          if (i === active) drawSelectedGlowText(label, tx, ty);
          else {
            ctx.fillStyle = light ? "#222831" : tweaks.labelColor;
            ctx.fillText(label, tx, ty);
          }
        }
      }
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }

  function targetFor(i: number) {
    if (itemLens && !vertical) {
      const m = buttonMetrics()[i];
      return m?.cx ?? W * 0.5;
    }
    const g = barGeom();
    if (vertical) return g.iy + buttonHeight * (i + 0.5);
    return g.ix + buttonWidth * (i + 0.5);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    cy = H / 2;
    const g = barGeom();
    if (itemLens && !vertical) {
      const metrics = buttonMetrics();
      const sample = metrics[0];
      buttonWidth = sample?.w ?? g.iw / itemCount();
      buttonHeight = sample?.h ?? g.ih;
      cx = g.ix + g.iw / 2;
    } else {
      buttonWidth = vertical ? g.iw : g.iw / itemCount();
      buttonHeight = vertical ? g.ih / itemCount() : g.ih;
      cx = g.ix + g.iw / 2;
    }
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    target = x = targetFor(active);
    v = 0;
    drawBackground();
    emitLayout();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resizeObserver.observe(stage);
  resize();

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  let scrubbing = false;
  let scrubMoved = false;
  let scrubStartY = 0;

  function scrubFromPointer(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    if (!vertical) return;
    if (scrubbing && Math.abs(pointer.y - scrubStartY) > 8) scrubMoved = true;
    const g = barGeom();
    const yMin = targetFor(0);
    const yMax = targetFor(itemCount() - 1);
    // Continuous Y follow (empty gutter / over labels) — spring to finger.
    target = Math.max(yMin, Math.min(yMax, pointer.y));
    if (pointer.y >= g.iy && pointer.y <= g.iy + g.ih && g.ih > 0) {
      const rel = (pointer.y - g.iy) / g.ih;
      hoverIndex = Math.max(0, Math.min(itemCount() - 1, Math.floor(rel * itemCount())));
    }
  }

  function trackPointer(e: PointerEvent) {
    if (!vertical) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      return;
    }
    if (e.buttons === 0 && e.pointerType === "mouse" && !scrubbing) {
      scrubFromPointer(e.clientX, e.clientY);
      return;
    }
    if (scrubbing || e.buttons > 0 || e.pointerType !== "mouse") {
      scrubFromPointer(e.clientX, e.clientY);
    }
  }

  function onPointerDown(e: PointerEvent) {
    if (!vertical) return;
    scrubbing = true;
    scrubMoved = false;
    const rect = canvas.getBoundingClientRect();
    scrubStartY = e.clientY - rect.top;
    try {
      stage.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    scrubFromPointer(e.clientX, e.clientY);
  }

  function onPointerUp(e: PointerEvent) {
    if (!vertical) return;
    scrubbing = false;
    try {
      if (stage.hasPointerCapture?.(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onPointerLeaveStage() {
    pointer.x = -9999;
    pointer.y = -9999;
    suppressHover = false;
    if (vertical && !scrubbing) {
      hoverIndex = -1;
      target = targetFor(active);
    }
  }

  function onNavPointerLeave() {
    suppressHover = false;
    hoverIndex = -1;
    target = targetFor(active);
  }

  const buttonCleanups: (() => void)[] = [];

  function wireButtons() {
    for (const off of buttonCleanups) off();
    buttonCleanups.length = 0;

    const buttons = getButtons();
    buttons.forEach((b, i) => {
      const onEnter = () => {
        if (suppressHover) return;
        hoverIndex = i;
        target = targetFor(i);
      };
      const onFocus = () => {
        if (suppressHover) return;
        hoverIndex = i;
        target = targetFor(i);
      };
      const onClick = (e: Event) => {
        if (scrubMoved) {
          e.preventDefault();
          e.stopPropagation();
          scrubMoved = false;
          return;
        }
        active = i;
        target = targetFor(i);
        hoverIndex = -1;
        suppressHover = true; // circle until leave; hover again after re-enter
      };
      b.addEventListener("pointerenter", onEnter);
      b.addEventListener("focus", onFocus);
      b.addEventListener("click", onClick);
      buttonCleanups.push(() => {
        b.removeEventListener("pointerenter", onEnter);
        b.removeEventListener("focus", onFocus);
        b.removeEventListener("click", onClick);
      });
    });

    const nav = buttons[0]?.closest("nav");
    if (nav) {
      nav.addEventListener("pointerleave", onNavPointerLeave);
      buttonCleanups.push(() => nav.removeEventListener("pointerleave", onNavPointerLeave));
    }
  }

  wireButtons();

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", trackPointer);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerUp);
  stage.addEventListener("pointerleave", onPointerLeaveStage);

  let last = performance.now();

  function tick(now: number) {
    if (destroyed) return;
    if (document.hidden) {
      // Backgrounded tab — skip the draw, avoid a large dt jump on return.
      last = now;
      rafId = requestAnimationFrame(tick);
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.035);
    last = now;
    animTime = now / 1000;
    if (reduced.matches) {
      x = target;
      v = 0;
    } else {
      v += (target - x) * tweaks.followSpring * dt;
      v *= Math.exp(-tweaks.followDamp * dt);
      x += v * dt;
      if (Math.abs(target - x) < 0.35 && Math.abs(v) < 12) {
        x = target;
        v = 0;
      }
    }

    drawBackground();

    let lensCx: number;
    let lensCy: number;
    let lensW: number;
    let lensH: number;
    if (vertical) {
      // Text can sit further right; the pill stays on the old left track
      // and is ~20% shorter than the previous mobile height.
      if (itemLens) {
        const diameter = Math.max(20, tweaks.lensDiameter);
        const squash = Math.max(0.22, Math.min(1, tweaks.lensSquashY ?? 1));
        lensCx = cx;
        lensCy = x;
        lensW = diameter;
        lensH = diameter * squash;
        shapeBlend = 0;
      } else {
        lensH = Math.max(35, buttonHeight * 0.656);
        const lensLeft = 8;
        const lensRight = W + lensH;
        lensCx = (lensLeft + lensRight) * 0.5;
        lensCy = x;
        lensW = Math.max(64, lensRight - lensLeft);
      }
    } else if (itemLens) {
      const metrics = buttonMetrics();
      const focusIdx = hoverIndex >= 0 ? hoverIndex : active;
      let nearest = metrics[focusIdx] ?? metrics[active] ?? metrics[0];
      let best = Infinity;
      for (const m of metrics) {
        const d = Math.abs(m.cx - x);
        if (d < best) {
          best = d;
          nearest = m;
        }
      }
      // Emerald cut: width × height, corners chamfered in shader.
      const diameter = Math.max(20, tweaks.lensDiameter);
      const squash = Math.max(0.22, Math.min(1, tweaks.lensSquashY ?? 1));
      lensCx = x;
      lensCy = nearest?.cy ?? cy;
      lensW = diameter;
      lensH = diameter * squash;
      shapeBlend = 0;
    } else {
      const diameter = Math.max(56, tweaks.lensDiameter);
      lensCx = x;
      lensCy = cy;
      lensW =
        diameter + Math.min(Math.abs(v) * tweaks.followStretch, Math.max(0, tweaks.followStretchMax));
      lensH = diameter;
    }
    const insideRaw = capsuleDist(pointer.x, pointer.y, lensCx, lensCy, lensW, lensH) < -1 ? 1 : 0;
    hoverSmooth += (insideRaw - hoverSmooth) * Math.min(1, dt * Math.max(0.5, tweaks.hoverLerp));

    const gt = mixGlassTweaks(tweaks, hoverTweaks, hoverSmooth, hoverBlendKeys);

    // Re-size lens with blended diameter so hover optical size can animate too.
    if (itemLens) {
      const diameter = Math.max(20, gt.lensDiameter);
      const squash = Math.max(0.22, Math.min(1, gt.lensSquashY ?? 1));
      if (vertical) {
        lensCx = cx;
        lensCy = x;
      }
      lensW = diameter;
      lensH = diameter * squash;
    }

    const tint = hexToRgb(gt.tint);
    const flare = hexToRgb(gt.flare);
    const contour = hexToRgb(gt.contourColor);

    gl.uniform2f(U.resolution, W, H);
    gl.uniform2f(U.center, lensCx, lensCy);
    gl.uniform2f(U.size, lensW, lensH);
    gl.uniform1f(U.power, gt.ior);
    gl.uniform1f(U.reflections, gt.reflections);
    gl.uniform1f(U.glow, gt.glow);
    gl.uniform1f(U.lightMode, light ? 1 : 0);
    gl.uniform1f(U.thickness, gt.thickness);
    gl.uniform1f(U.dispersion, gt.dispersion);
    gl.uniform1f(U.transmission, gt.transmission);
    gl.uniform1f(U.roughness, gt.roughness);
    gl.uniform1f(U.clearcoat, gt.clearcoat);
    gl.uniform1f(U.fresnelPower, gt.fresnelPower);
    gl.uniform1f(U.rim, gt.rim);
    gl.uniform1f(U.dichroic, gt.dichroic);
    gl.uniform1f(U.spectralSat, gt.spectralSat);
    gl.uniform1f(U.spectralHue, gt.spectralHue);
    gl.uniform1f(U.flareStrength, gt.flareStrength);
    gl.uniform1f(U.specularIntensity, gt.specularIntensity);
    gl.uniform1f(U.creamStrength, gt.creamStrength);
    gl.uniform1f(U.tintStrength, gt.tintStrength);
    gl.uniform3f(U.tint, tint[0], tint[1], tint[2]);
    gl.uniform3f(U.flareColor, flare[0], flare[1], flare[2]);
    gl.uniform1f(U.time, vertical ? animTime * 0.55 : animTime);
    gl.uniform1f(U.cavity, gt.cavity);
    gl.uniform1f(U.cavityTop, gt.cavityTop);
    gl.uniform1f(U.cavityBottom, gt.cavityBottom);
    gl.uniform1f(U.hoverInside, hoverSmooth);
    gl.uniform1f(U.contourStrength, gt.contourStrength);
    gl.uniform1f(U.contourWidth, gt.contourWidth);
    gl.uniform1f(U.contourSoft, gt.contourSoft);
    gl.uniform3f(U.contourColor, contour[0], contour[1], contour[2]);
    const barG = barGeom();
    const useMask = itemLens && !vertical ? 1 : 0;
    gl.uniform1f(U.useBarMask, useMask);
    gl.uniform2f(U.barCenter, barG.sx + barG.barW * 0.5, barG.sy + barG.barH * 0.5);
    gl.uniform2f(U.barHalf, barG.barW * 0.5, barG.barH * 0.5);
    gl.uniform1f(U.sphereGlint, gt.sphereGlint);
    gl.uniform1f(U.sphereGlintY, gt.sphereGlintY);
    gl.uniform1f(U.ellipseShape, itemLens ? 1 : 0);
    const ch = Math.max(0, gt.lensChamfer ?? 0);
    gl.uniform1f(U.chamfer, itemLens ? ch : 0);
    const emerald = itemLens;
    /* Facets off everywhere — midplane hairline (mobile permanent / desktop seam) */
    gl.uniform1f(U.facetInset, 0);
    gl.uniform1f(U.facetWidth, 1);
    gl.uniform1f(U.facetStrength, 0);
    gl.uniform1f(U.facetSoft, 1);
    gl.uniform1f(U.facetSpoke, 0);
    gl.uniform1f(U.facetSpokeWidth, 1);
    gl.uniform1f(U.facetWedge, 0);
    gl.uniform1f(U.facetWedgeSoft, 1);
    gl.uniform1f(U.facetWedgePower, 1);
    gl.uniform1f(U.facetWedgePhase, 0);
    gl.uniform1f(U.haloAlpha, Math.max(0, Math.min(1, gt.lensHaloAlpha ?? 1)));
    gl.uniform1f(U.verticalMode, vertical ? 1 : 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  function onContextLost(e: Event) {
    e.preventDefault();
    cancelAnimationFrame(rafId);
    onContextLostOpt?.();
  }

  function onContextRestored() {
    if (destroyed) return;
    resize();
    last = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  canvas.addEventListener("webglcontextlost", onContextLost, false);
  canvas.addEventListener("webglcontextrestored", onContextRestored, false);

  return {
    setActive(i: number) {
      active = i;
      target = targetFor(i);
      x = targetFor(i);
      v = 0;
    },
    setLabels(next: string[]) {
      labels = next;
    },
    setTarget(i: number) {
      target = targetFor(i);
    },
    getTweaks() {
      return { ...tweaks };
    },
    setTweaks(partial: Partial<LiquidGlassTweaks>) {
      Object.assign(tweaks, partial);
    },
    setHoverTweaks(next: LiquidGlassTweaks | null, keys?: (keyof LiquidGlassTweaks)[]) {
      hoverTweaks = next ? { ...next } : null;
      hoverBlendKeys = keys ? [...keys] : null;
    },
    resetTweaks() {
      Object.assign(tweaks, LIQUID_GLASS_DEFAULTS);
    },
    getLayout() {
      return computeLayout();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", trackPointer);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerleave", onPointerLeaveStage);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      for (const off of buttonCleanups) off();
      buttonCleanups.length = 0;
      // Do not call loseContext() — React Strict Mode remounts on the same
      // <canvas>; a lost context cannot be reacquired and paints as a white slab.
    },
  };
}
