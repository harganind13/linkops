import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero 3D scene — built imperatively to avoid r3f JSX intrinsics
 * (which would receive @emergentbase/visual-edits' `x-line-number` attrs).
 */

function buildSpline() {
  const pts = [];
  const N = 12;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const x = THREE.MathUtils.lerp(-3.2, 3.2, t);
    const y =
      THREE.MathUtils.lerp(-1.4, 1.6, Math.pow(t, 1.4)) +
      Math.sin(t * Math.PI * 2.2) * 0.18;
    const z = Math.sin(t * Math.PI * 1.5) * 0.35;
    pts.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);

  const root = new THREE.Group();

  const tubeGeos = [
    new THREE.TubeGeometry(curve, 240, 0.05, 12, false),
    new THREE.TubeGeometry(curve, 240, 0.14, 12, false),
    new THREE.TubeGeometry(curve, 240, 0.28, 12, false),
  ];
  const tubeMats = [
    new THREE.MeshBasicMaterial({ color: "#6BE05A", toneMapped: false }),
    new THREE.MeshBasicMaterial({ color: "#6BE05A", transparent: true, opacity: 0.18, toneMapped: false, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: "#6BE05A", transparent: true, opacity: 0.06, toneMapped: false, depthWrite: false }),
  ];
  tubeGeos.forEach((g, i) => root.add(new THREE.Mesh(g, tubeMats[i])));

  const orbCoreGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const orbHaloGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const orbCoreMat = new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false });
  const orbHaloMat = new THREE.MeshBasicMaterial({
    color: "#6BE05A",
    transparent: true,
    opacity: 0.35,
    toneMapped: false,
    depthWrite: false,
  });

  const orbs = [];
  for (let i = 0; i < 7; i++) {
    const og = new THREE.Group();
    og.position.copy(curve.getPointAt(i / 6));
    og.add(new THREE.Mesh(orbCoreGeo, orbCoreMat));
    og.add(new THREE.Mesh(orbHaloGeo, orbHaloMat));
    og.userData.delay = i * 0.4;
    root.add(og);
    orbs.push(og);
  }

  // Particles
  const pCount = 80;
  const positions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: "#6BE05A",
    size: 0.04,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const particles = new THREE.Points(pGeo, pMat);
  particles.userData.isParticles = true;
  root.add(particles);

  return {
    root,
    orbs,
    particles,
    dispose: () => {
      tubeGeos.forEach((g) => g.dispose());
      tubeMats.forEach((m) => m.dispose());
      orbCoreGeo.dispose();
      orbHaloGeo.dispose();
      orbCoreMat.dispose();
      orbHaloMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    },
  };
}

function SceneController() {
  const { scene } = useThree();
  const splineGroupRef = useRef(null);
  const particlesRef = useRef(null);
  const orbsRef = useRef([]);

  const sceneObj = useMemo(() => buildSpline(), []);

  useEffect(() => {
    // Use a dedicated wrapper to allow rotation independent of particles
    const wrapper = new THREE.Group();
    // Move orbs/tubes into spline group, particles separate so we can rotate them differently
    const splineGroup = new THREE.Group();
    sceneObj.root.children.slice().forEach((child) => {
      if (child === sceneObj.particles) return;
      splineGroup.add(child);
    });
    wrapper.add(splineGroup);
    wrapper.add(sceneObj.particles);
    scene.add(wrapper);

    splineGroupRef.current = splineGroup;
    particlesRef.current = sceneObj.particles;
    orbsRef.current = sceneObj.orbs;

    return () => {
      scene.remove(wrapper);
      sceneObj.dispose();
    };
  }, [scene, sceneObj]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (splineGroupRef.current) {
      splineGroupRef.current.rotation.y = Math.sin(t * 0.25) * 0.18;
      splineGroupRef.current.rotation.x = Math.sin(t * 0.18) * 0.06;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04;
    }
    orbsRef.current.forEach((og) => {
      const s = 1 + Math.sin(t * 1.6 + og.userData.delay) * 0.18;
      og.scale.setScalar(s);
    });
  });

  return null;
}

export default function TrendSpline3D() {
  return (
    <div className="absolute inset-0" data-testid="hero-3d-spline" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      >
        <SceneController />
      </Canvas>
    </div>
  );
}
