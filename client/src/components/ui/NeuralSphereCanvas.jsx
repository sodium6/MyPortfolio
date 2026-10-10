import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * NeuralSphereCanvas
 * Interactive 3D Neural Wireframe / Geodesic Sphere animation
 * Matches the reference image with glowing constellation nodes,
 * delicate geometric interconnects, and smooth ambient rotation.
 */
const NeuralSphereCanvas = ({ className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // Transparent

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- 2. Master Sphere Group ---
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Shift sphere slightly to the right inside canvas
    sphereGroup.position.set(0.4, 0, 0);

    // --- 3. Glow Texture Generator for Nodes ---
    const createNodeTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');

      const radGrad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      radGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
      radGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(cvs);
      return tex;
    };

    const nodeTexture = createNodeTexture();

    // --- 4. Geodesic Sphere Geometry (Slightly larger, clearly spherical) ---
    const sphereRadius = 2.45; // Slightly enlarged circular globe
    const baseGeo = new THREE.IcosahedronGeometry(sphereRadius, 2);

    // Wireframe Line Segments
    const wireGeo = new THREE.WireframeGeometry(baseGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const lineSegments = new THREE.LineSegments(wireGeo, lineMat);
    sphereGroup.add(lineSegments);

    // Extract Unique Vertex Positions
    const posAttr = baseGeo.attributes.position;
    const uniqueMap = new Map();
    const uniquePositions = [];

    for (let i = 0; i < posAttr.count; i++) {
      const x = Number(posAttr.getX(i).toFixed(3));
      const y = Number(posAttr.getY(i).toFixed(3));
      const z = Number(posAttr.getZ(i).toFixed(3));
      const key = `${x}_${y}_${z}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, true);
        uniquePositions.push(new THREE.Vector3(x, y, z));
      }
    }

    // Points Geometry (Standard Nodes)
    const pointsGeo = new THREE.BufferGeometry();
    const positionsArray = new Float32Array(uniquePositions.length * 3);
    for (let i = 0; i < uniquePositions.length; i++) {
      positionsArray[i * 3] = uniquePositions[i].x;
      positionsArray[i * 3 + 1] = uniquePositions[i].y;
      positionsArray[i * 3 + 2] = uniquePositions[i].z;
    }
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

    const pointsMat = new THREE.PointsMaterial({
      map: nodeTexture,
      color: 0xffffff,
      size: 0.13,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    sphereGroup.add(pointsMesh);

    // Prominent Highlight Nodes (select a subset of vertices that glow larger)
    const highlightPositions = [];
    for (let i = 0; i < uniquePositions.length; i++) {
      if (i % 3 === 0) {
        highlightPositions.push(uniquePositions[i]);
      }
    }

    const hlPointsGeo = new THREE.BufferGeometry();
    const hlPosArray = new Float32Array(highlightPositions.length * 3);
    for (let i = 0; i < highlightPositions.length; i++) {
      hlPosArray[i * 3] = highlightPositions[i].x;
      hlPosArray[i * 3 + 1] = highlightPositions[i].y;
      hlPosArray[i * 3 + 2] = highlightPositions[i].z;
    }
    hlPointsGeo.setAttribute('position', new THREE.BufferAttribute(hlPosArray, 3));

    const hlPointsMat = new THREE.PointsMaterial({
      map: nodeTexture,
      color: 0xffffff,
      size: 0.24,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const hlPointsMesh = new THREE.Points(hlPointsGeo, hlPointsMat);
    sphereGroup.add(hlPointsMesh);

    // Sparse Internal Neural Chords / Cross-beams
    const chordPositions = [];
    for (let i = 0; i < highlightPositions.length; i += 2) {
      if (i + 1 < highlightPositions.length) {
        chordPositions.push(
          highlightPositions[i].x,
          highlightPositions[i].y,
          highlightPositions[i].z,
          highlightPositions[i + 1].x,
          highlightPositions[i + 1].y,
          highlightPositions[i + 1].z
        );
      }
    }
    const chordGeo = new THREE.BufferGeometry();
    chordGeo.setAttribute('position', new THREE.Float32BufferAttribute(chordPositions, 3));
    const chordMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    const chordLines = new THREE.LineSegments(chordGeo, chordMat);
    sphereGroup.add(chordLines);

    // --- 5. Mouse Parallax Interaction ---
    let targetRotX = 0.2;
    let targetRotY = 0.4;
    let currentRotX = 0.2;
    let currentRotY = 0.4;

    const handleMouseMove = (e) => {
      const section = container.closest('section') || container;
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.9;
      targetRotX = ny * 0.7;
    };

    const sectionElem = container.closest('section') || window;
    sectionElem.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- 6. Animation Loop ---
    let isVisible = true;
    let animId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      // Base rotation + mouse parallax
      sphereGroup.rotation.y = elapsed * 0.12 + currentRotY;
      sphereGroup.rotation.x = 0.15 + Math.sin(elapsed * 0.08) * 0.1 + currentRotX;
      sphereGroup.rotation.z = Math.cos(elapsed * 0.06) * 0.05;

      // Subtle breathing on highlighted nodes
      hlPointsMat.size = 0.24 + Math.sin(elapsed * 2.5) * 0.025;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    // --- 7. IntersectionObserver for 0% CPU Overhead ---
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

    // --- 8. Responsive Resize ---
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

    // --- Cleanup ---
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      sectionElem.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);

      baseGeo.dispose();
      wireGeo.dispose();
      pointsGeo.dispose();
      hlPointsGeo.dispose();
      chordGeo.dispose();
      lineMat.dispose();
      pointsMat.dispose();
      hlPointsMat.dispose();
      chordMat.dispose();
      nodeTexture.dispose();
      renderer.dispose();

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default NeuralSphereCanvas;
