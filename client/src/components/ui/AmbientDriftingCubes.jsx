import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * AmbientDriftingCubes
 * Lightweight, high-performance background WebGL canvas featuring ambient micro-cubes
 * that share the exact visual DNA of the Hero's glass refraction cube.
 *
 * Features:
 * - 6-Band subtle prismatic Fresnel & specular dispersion shader matching the Hero cube
 * - Precision-chamfered wireframe edges that catch light as they tumble
 * - Fluid sine-wave ambient floating and organic multi-axis tumbling
 * - Mouse parallax depth tilt responding to cursor movement
 * - IntersectionObserver auto-sleep when section is scrolled out of viewport (0% CPU/GPU overhead)
 * - Zero interference with UI interaction (pointer-events-none, z-0)
 */
const AmbientDriftingCubes = ({
  variant = 'projects', // 'projects' | 'skills'
  cubeCount = 14,
  className = ''
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 800;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0); // Transparent background

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      variant === 'skills' ? 0xc084fc : 0x38bdf8,
      0.8
    );
    fillLight.position.set(-6, -5, -4);
    scene.add(fillLight);

    // --- Glass Fragment Shader matching Hero Cube aesthetics ---
    const glassMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTint: {
          value:
            variant === 'skills'
              ? new THREE.Vector3(0.7, 0.55, 1.0)
              : new THREE.Vector3(0.65, 0.85, 1.0)
        },
        uOpacity: { value: variant === 'skills' ? 0.22 : 0.26 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vEye;
        varying vec3 vWorldPos;

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vec4 mvPos = viewMatrix * worldPos;
          gl_Position = projectionMatrix * mvPos;
          vNormal = normalize(normalMatrix * normal);
          vEye = normalize(mvPos.xyz);
          vWorldPos = worldPos.xyz;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uTint;
        uniform float uOpacity;

        varying vec3 vNormal;
        varying vec3 vEye;
        varying vec3 vWorldPos;

        void main() {
          vec3 n = normalize(vNormal);
          vec3 eye = normalize(-vEye);

          // Fresnel rim reflection (glass outer boundary)
          float fresnel = pow(1.0 - max(0.0, dot(eye, n)), 3.0);

          // Spectral rainbow dispersion on edges matching Hero Cube
          vec3 rainbow = 0.5 + 0.5 * cos(6.28318 * (dot(n, vec3(0.577)) * 0.9 + vec3(0.0, 0.33, 0.67)));

          // Specular glint
          vec3 lightDir = normalize(vec3(0.8, 1.2, 1.0));
          vec3 halfVec = normalize(lightDir + eye);
          float spec = pow(max(dot(n, halfVec), 0.0), 32.0);

          // Blend glass body with iridescent rainbow edge rim
          vec3 baseGlass = mix(vec3(0.04, 0.05, 0.08), uTint * 0.15, 0.5);
          vec3 finalColor = baseGlass + rainbow * fresnel * 0.75 + vec3(1.0) * spec * 0.8;

          float alpha = clamp(uOpacity * 0.4 + fresnel * 0.55 + spec * 0.4, 0.0, 0.75);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide
    });

    // Wireframe edge material for technical CAD / Glass outline
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: variant === 'skills' ? 0xd8b4fe : 0xe2e8f0,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    // --- Generate Floating Micro-Cubes ---
    const cubesGroup = new THREE.Group();
    scene.add(cubesGroup);

    const count = cubeCount;
    const cubeData = [];

    // Distinct sizes & aspect ratios: some cubes, some monolithic architecture cuboids
    const geometriesToDispose = [];

    for (let i = 0; i < count; i++) {
      // Stratified distribution to keep center spacious for text/cards
      // Places cubes primarily along left, right, top, bottom margins and varying depths
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const radiusX = 8.5 + Math.random() * 7.5;
      const radiusY = 5.0 + Math.random() * 4.5;

      const posX = Math.cos(angle) * radiusX + (Math.random() - 0.5) * 2;
      const posY = Math.sin(angle) * radiusY + (Math.random() - 0.5) * 2;
      const posZ = (Math.random() - 0.5) * 8 - 1; // Depth layering

      // Dimension variations
      const sizeScale = 0.55 + Math.random() * 0.85; // 0.55 to 1.4
      const aspectX = Math.random() > 0.6 ? 1.4 : 1.0;
      const aspectY = Math.random() > 0.7 ? 1.3 : 1.0;
      const aspectZ = Math.random() > 0.5 ? 1.2 : 1.0;

      const sx = sizeScale * aspectX;
      const sy = sizeScale * aspectY;
      const sz = sizeScale * aspectZ;

      // Rounded Box Geometry matching Hero Cube
      const boxGeo = new RoundedBoxGeometry(sx, sy, sz, 2, 0.08 * sizeScale);
      geometriesToDispose.push(boxGeo);

      const mesh = new THREE.Mesh(boxGeo, glassMaterial);

      // Add crisp glowing edges
      const edgeGeo = new THREE.EdgesGeometry(boxGeo, 24);
      geometriesToDispose.push(edgeGeo);
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMaterial);
      mesh.add(edgeLines);

      mesh.position.set(posX, posY, posZ);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      cubesGroup.add(mesh);

      cubeData.push({
        mesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: (Math.random() - 0.5) * 0.007,
        rotSpeedZ: (Math.random() - 0.5) * 0.004,
        floatFreq: 0.4 + Math.random() * 0.6,
        floatAmp: 0.25 + Math.random() * 0.4,
        floatPhase: Math.random() * Math.PI * 2
      });
    }

    // Optional: Subtle floating ambient crystal dust particles
    const particleCount = variant === 'skills' ? 45 : 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 32;
      particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    geometriesToDispose.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: variant === 'skills' ? 0xd8b4fe : 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Interactive Mouse Parallax ---
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const handleMouseMove = (e) => {
      const parent = container.parentElement || container;
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // Convert to normalized coordinates [-1, 1]
      mouseTargetX = (x - 0.5) * 2;
      mouseTargetY = -(y - 0.5) * 2;
    };

    const parentElem = container.parentElement || window;
    parentElem.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Animation & Visibility Control ---
    let isVisible = true;
    let animId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      glassMaterial.uniforms.uTime.value = elapsed;

      // Mouse Parallax Smooth Interpolation (lerp)
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.04;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.04;

      cubesGroup.rotation.y = mouseCurrentX * 0.12;
      cubesGroup.rotation.x = -mouseCurrentY * 0.09;

      // Drift & Tumbling Micro-Cubes
      for (let i = 0; i < cubeData.length; i++) {
        const item = cubeData[i];
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Subtle sine wave floating
        item.mesh.position.y =
          item.baseY +
          Math.sin(elapsed * item.floatFreq + item.floatPhase) * item.floatAmp;
        item.mesh.position.x =
          item.baseX +
          Math.cos(elapsed * (item.floatFreq * 0.7) + item.floatPhase) *
            (item.floatAmp * 0.5);
      }

      // Very slow drift on particle dust
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.008;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    // --- IntersectionObserver for Zero CPU Overhead when off-screen ---
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            clock.start();
            animate();
          }
        } else {
          isVisible = false;
          if (animId) cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    animate();

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Clean Up ---
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      parentElem.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);

      geometriesToDispose.forEach((g) => g.dispose());
      glassMaterial.dispose();
      edgeMaterial.dispose();
      particleMat.dispose();
      renderer.dispose();

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [variant, cubeCount]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default AmbientDriftingCubes;
