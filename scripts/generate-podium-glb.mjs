// Generates public/logo/podium-inflated.glb — a closed, manifold, beveled
// extrusion of the "PODIUM" wordmark, used by src/lib/glass/glass-experience.ts
// as the base geometry for the refractive glass hero logo.
//
// Run: node scripts/generate-podium-glb.mjs
//
// The exported mesh's own material is irrelevant at runtime — glass-experience.ts
// replaces every mesh material with its own THREE.MeshPhysicalMaterial. Only the
// geometry (closed surfaces, preserved letter counters, rounded bevel profile,
// correct normals) matters here.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import opentype from "opentype.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// GLTFExporter is written for the browser and reads its output Blob back via
// FileReader. Node has no FileReader — polyfill the minimal surface it needs
// on top of Node's built-in Blob (which does support arrayBuffer()).
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        this.onloadend?.();
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const base64 = Buffer.from(buf).toString("base64");
        this.result = `data:${blob.type || "application/octet-stream"};base64,${base64}`;
        this.onloadend?.();
      });
    }
  };
}

const TEXT = "PODIUM";
const FONT_PATH = path.join(__dirname, "assets/Manrope-ExtraBold.ttf");
const OUT_PATH = path.join(ROOT, "public/logo/podium-inflated.glb");

const FONT_SIZE = 1000; // opentype units at this em size
const EXTRUDE_DEPTH = 90;
const BEVEL_THICKNESS = 34;
const BEVEL_SIZE = 30;
const BEVEL_SEGMENTS = 6;
const CURVE_SEGMENTS = 12; // also used for winding/area sampling

function fontToShapes(font, text, fontSize) {
  const glyphs = font.stringToGlyphs(text);
  const shapes = [];
  let x = 0;

  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];
    // opentype.js negates Y in getPath() to target canvas/SVG's y-down space.
    // Undo that here — THREE.Shape/ExtrudeGeometry expects y-up — otherwise
    // the extruded glyphs come out vertically flipped (reads as mirrored).
    const glyphPath = glyph.getPath(x, 0, fontSize);
    const commands = glyphPath.commands.map((cmd) => ({
      ...cmd,
      ...("y" in cmd ? { y: -cmd.y } : null),
      ...("y1" in cmd ? { y1: -cmd.y1 } : null),
      ...("y2" in cmd ? { y2: -cmd.y2 } : null),
    }));
    const contours = splitContours(commands);

    const scored = contours.map((commands) => ({
      commands,
      area: signedArea(sampleContour(commands)),
    }));
    scored.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));

    if (scored.length > 0) {
      const outer = pathFromCommands(scored[0].commands, THREE.Shape);
      for (let j = 1; j < scored.length; j++) {
        outer.holes.push(pathFromCommands(scored[j].commands, THREE.Path));
      }
      shapes.push(outer);
    }

    const kerning = i < glyphs.length - 1 ? font.getKerningValue(glyph, glyphs[i + 1]) : 0;
    x += (glyph.advanceWidth + kerning) * (fontSize / font.unitsPerEm);
  }

  return shapes;
}

function splitContours(commands) {
  const contours = [];
  let current = [];
  for (const cmd of commands) {
    if (cmd.type === "M" && current.length > 0) {
      contours.push(current);
      current = [];
    }
    current.push(cmd);
  }
  if (current.length > 0) contours.push(current);
  return contours;
}

function sampleContour(commands) {
  const points = [];
  let cur = { x: 0, y: 0 };
  for (const cmd of commands) {
    if (cmd.type === "M" || cmd.type === "L") {
      cur = { x: cmd.x, y: cmd.y };
      points.push(cur);
    } else if (cmd.type === "Q") {
      for (let t = 1; t <= CURVE_SEGMENTS; t++) {
        const u = t / CURVE_SEGMENTS;
        points.push(quadAt(cur, { x: cmd.x1, y: cmd.y1 }, { x: cmd.x, y: cmd.y }, u));
      }
      cur = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === "C") {
      for (let t = 1; t <= CURVE_SEGMENTS; t++) {
        const u = t / CURVE_SEGMENTS;
        points.push(cubicAt(cur, { x: cmd.x1, y: cmd.y1 }, { x: cmd.x2, y: cmd.y2 }, { x: cmd.x, y: cmd.y }, u));
      }
      cur = { x: cmd.x, y: cmd.y };
    }
  }
  return points;
}

function quadAt(p0, p1, p2, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function cubicAt(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function signedArea(points) {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return sum / 2;
}

function pathFromCommands(commands, Ctor) {
  const p = new Ctor();
  for (const cmd of commands) {
    if (cmd.type === "M") p.moveTo(cmd.x, cmd.y);
    else if (cmd.type === "L") p.lineTo(cmd.x, cmd.y);
    else if (cmd.type === "Q") p.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    else if (cmd.type === "C") p.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    else if (cmd.type === "Z") p.closePath();
  }
  return p;
}

async function main() {
  const fontBuffer = readFileSync(FONT_PATH);
  const font = opentype.parse(fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength));

  const shapes = fontToShapes(font, TEXT, FONT_SIZE);
  console.log(`Built ${shapes.length} glyph shapes for "${TEXT}" (${shapes.reduce((n, s) => n + s.holes.length, 0)} holes total).`);

  let geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: EXTRUDE_DEPTH,
    bevelEnabled: true,
    bevelThickness: BEVEL_THICKNESS,
    bevelSize: BEVEL_SIZE,
    bevelSegments: BEVEL_SEGMENTS,
    curveSegments: CURVE_SEGMENTS,
    steps: 1,
  });

  geometry = mergeVertices(geometry, 1e-4);
  geometry.computeVertexNormals();

  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeBoundingBox();

  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);
  const vertexCount = geometry.attributes.position.count;
  const triCount = geometry.index ? geometry.index.count / 3 : vertexCount / 3;
  console.log(`Geometry: ${vertexCount} vertices, ${triCount} triangles, size = (${size.x.toFixed(1)}, ${size.y.toFixed(1)}, ${size.z.toFixed(1)}).`);
  if (!Number.isFinite(size.x) || size.x <= 0 || size.y <= 0 || size.z <= 0) {
    throw new Error("Degenerate geometry bounds — aborting export.");
  }

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "PODIUM";
  const scene = new THREE.Scene();
  scene.add(mesh);

  mkdirSync(path.dirname(OUT_PATH), { recursive: true });

  const exporter = new GLTFExporter();
  const result = await exporter.parseAsync(scene, { binary: true });
  writeFileSync(OUT_PATH, Buffer.from(result));
  console.log(`Wrote ${OUT_PATH} (${(result.byteLength / 1024).toFixed(1)} KB).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
