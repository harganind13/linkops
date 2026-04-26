import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Network of pulsing connection nodes — built imperatively (no r3f JSX intrinsics)
 * to avoid `@emergentbase/visual-edits` injecting `x-line-number` attrs.
 */

function buildNetwork({ nodeCount = 38, accent = "#6BE05A" }) {
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 3
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.0035,
        (Math.random() - 0.5) * 0.0035,
        (Math.random() - 0.5) * 0.0025
      ),
    });
  }

  const root = new THREE.Group();

  // Points
  const pointPositions = new Float32Array(nodeCount * 3);
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  const pointMat = new THREE.PointsMaterial({
    color: accent,
    size: 0.07,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  const points = new THREE.Points(pointGeo, pointMat);
  root.add(points);

  // Lines
  const segCap = nodeCount * 6;
  const linePositions = new Float32Array(segCap * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  root.add(lines);

  return {
    root,
    nodes,
    points,
    lines,
    segCap,
    dispose: () => {
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    },
  };
}

function NetworkController({ nodeCount = 38, linkDistance = 1.7 }) {
  const { scene } = useThree();
  const stateRef = useRef(null);

  const obj = useMemo(() => buildNetwork({ nodeCount }), [nodeCount]);

  useEffect(() => {
    scene.add(obj.root);
    stateRef.current = obj;
    return () => {
      scene.remove(obj.root);
      obj.dispose();
    };
  }, [scene, obj]);

  useFrame(() => {
    const s = stateRef.current;
    if (!s) return;
    const { nodes, points, lines, segCap } = s;

    // Update positions (bounce in box)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.pos.add(n.vel);
      if (n.pos.x > 3.5 || n.pos.x < -3.5) n.vel.x *= -1;
      if (n.pos.y > 2.3 || n.pos.y < -2.3) n.vel.y *= -1;
      if (n.pos.z > 1.5 || n.pos.z < -1.5) n.vel.z *= -1;
    }

    // Sync points
    const pArr = points.geometry.attributes.position.array;
    for (let i = 0; i < nodes.length; i++) {
      pArr[i * 3] = nodes[i].pos.x;
      pArr[i * 3 + 1] = nodes[i].pos.y;
      pArr[i * 3 + 2] = nodes[i].pos.z;
    }
    points.geometry.attributes.position.needsUpdate = true;

    // Sync lines
    const lArr = lines.geometry.attributes.position.array;
    let segIdx = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (segIdx >= segCap) break;
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < linkDistance) {
          lArr[segIdx * 6] = nodes[i].pos.x;
          lArr[segIdx * 6 + 1] = nodes[i].pos.y;
          lArr[segIdx * 6 + 2] = nodes[i].pos.z;
          lArr[segIdx * 6 + 3] = nodes[j].pos.x;
          lArr[segIdx * 6 + 4] = nodes[j].pos.y;
          lArr[segIdx * 6 + 5] = nodes[j].pos.z;
          segIdx++;
        }
      }
    }
    lines.geometry.attributes.position.needsUpdate = true;
    lines.geometry.setDrawRange(0, segIdx * 2);

    obj.root.rotation.y += 0.0007;
  });

  return null;
}

export default function NetworkNodes3D({
  nodeCount = 38,
  linkDistance = 1.7,
  className = "",
}) {
  return (
    <div className={`absolute inset-0 ${className}`} data-testid="network-nodes-3d" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <NetworkController nodeCount={nodeCount} linkDistance={linkDistance} />
      </Canvas>
    </div>
  );
}
