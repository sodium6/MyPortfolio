import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ThreeHeroCanvas
 * Seamless 3D WebGL Hero Atmosphere built with Three.js
 * - Positions the 3D Neural Nexus core towards the right side of the hero card
 * - Leaves ample clean space on the left for the avatar and biography
 * - Smooth mouse-move parallax and direct drag-to-orbit interaction
 */
const ThreeHeroCanvas = ({ className = '' }) => {
    const containerRef = useRef(null);
    const animFrameRef = useRef(null);

    const stateRef = useRef({
        targetRotationX: 0.15,
        targetRotationY: 0.35,
        currentRotationX: 0.15,
        currentRotationY: 0.35,
        isPointerDown: false,
        pointerStartX: 0,
        pointerStartY: 0,
        mouseXNormalized: 0,
        mouseYNormalized: 0
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 500;

        // --- 1. Scene, Camera, Renderer ---
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 15);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0); // completely transparent

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // --- 2. Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 50);
        scene.add(purpleLight);

        const cyanLight = new THREE.PointLight(0x06b6d4, 3.0, 50);
        scene.add(cyanLight);

        const pinkLight = new THREE.PointLight(0xec4899, 2.5, 35);
        scene.add(pinkLight);

        // --- 3. Master 3D Group ---
        const masterGroup = new THREE.Group();
        scene.add(masterGroup);

        // Dynamic positioning: Shift core cleanly to the right side of the hero
        const updateGroupPosition = (w, h) => {
            const vHalfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
            const vHalfWidth = vHalfHeight * (w / h);

            if (w >= 1280) {
                // Generously shifted to the right (around 56% of visible half-width)
                masterGroup.position.set(vHalfWidth * 0.56, 0.0, 0);
            } else if (w >= 1024) {
                masterGroup.position.set(vHalfWidth * 0.52, 0.0, 0);
            } else if (w >= 768) {
                masterGroup.position.set(vHalfWidth * 0.44, -0.2, -1.5);
            } else {
                // On mobile screens, position centered behind with depth offset
                masterGroup.position.set(0, -0.8, -4.5);
            }

            // Sync lights around the 3D core position
            purpleLight.position.set(masterGroup.position.x + 5, 8, 8);
            cyanLight.position.set(masterGroup.position.x - 5, -6, -6);
            pinkLight.position.set(masterGroup.position.x + 2, -4, 6);
        };

        updateGroupPosition(width, height);

        // A. Inner Crystalline Polyhedron (Octahedron with Cyber Glow)
        const innerGeo = new THREE.OctahedronGeometry(1.35, 0);
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0x06b6d4,
            emissive: 0x0e7490,
            shininess: 90,
            flatShading: true,
            transparent: true,
            opacity: 0.85
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        masterGroup.add(innerMesh);

        // Inner Core Wireframe Accent
        const innerWireGeo = new THREE.OctahedronGeometry(1.4, 0);
        const innerWireMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.65
        });
        const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat);
        masterGroup.add(innerWire);

        // B. Outer Icosahedron Lattice (Geodesic Neural Cage)
        const outerGeo = new THREE.IcosahedronGeometry(2.5, 1);
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        masterGroup.add(outerMesh);

        // Vertices points
        const vertexPointsGeo = new THREE.IcosahedronGeometry(2.5, 1);
        const vertexPointsMat = new THREE.PointsMaterial({
            color: 0xf472b6,
            size: 0.12,
            transparent: true,
            opacity: 0.95
        });
        const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointsMat);
        masterGroup.add(vertexPoints);

        // C. Dual Gimbal Orbit Rings
        const ring1Geo = new THREE.TorusGeometry(3.6, 0.02, 16, 120);
        const ring1Mat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            transparent: true,
            opacity: 0.65
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        ring1.rotation.y = Math.PI / 6;
        masterGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(4.3, 0.018, 16, 140);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.55
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = -Math.PI / 4;
        ring2.rotation.z = Math.PI / 5;
        masterGroup.add(ring2);

        // Satellites orbiting on rings
        const sat1Geo = new THREE.SphereGeometry(0.12, 12, 12);
        const sat1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
        ring1.add(sat1);
        sat1.position.set(3.6, 0, 0);

        const sat2Geo = new THREE.SphereGeometry(0.1, 12, 12);
        const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
        ring2.add(sat2);
        sat2.position.set(4.3, 0, 0);

        // D. Dynamic Synaptic Neural Nodes & Proximity Lines
        const NODE_COUNT = 70;
        const nodePositions = new Float32Array(NODE_COUNT * 3);
        const nodeVelocities = [];
        const radiusLimit = 5.2;

        for (let i = 0; i < NODE_COUNT; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 1.6 + Math.cbrt(Math.random()) * (radiusLimit - 1.6);

            nodePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            nodePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            nodePositions[i * 3 + 2] = r * Math.cos(phi);

            nodeVelocities.push({
                x: (Math.random() - 0.5) * 0.007,
                y: (Math.random() - 0.5) * 0.007,
                z: (Math.random() - 0.5) * 0.007
            });
        }

        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        const nodesMaterial = new THREE.PointsMaterial({
            color: 0xc084fc,
            size: 0.12,
            transparent: true,
            opacity: 0.8
        });
        const nodesPoints = new THREE.Points(nodesGeometry, nodesMaterial);
        masterGroup.add(nodesPoints);

        // Synaptic Lines
        const MAX_LINES = 120;
        const linePositions = new Float32Array(MAX_LINES * 2 * 3);
        const lineColors = new Float32Array(MAX_LINES * 2 * 3);

        const linesGeometry = new THREE.BufferGeometry();
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        masterGroup.add(linesMesh);

        // E. Full-Hero Ambient Stardust (Broadly dispersed)
        const STAR_COUNT = 250;
        const starPositions = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 35;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
        }
        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xa5b4fc,
            size: 0.07,
            transparent: true,
            opacity: 0.45
        });
        const starPoints = new THREE.Points(starGeo, starMat);
        scene.add(starPoints);

        // --- 4. Interactive Event Handlers ---
        const dom = renderer.domElement;

        const onPointerDown = (e) => {
            stateRef.current.isPointerDown = true;
            stateRef.current.pointerStartX = e.clientX;
            stateRef.current.pointerStartY = e.clientY;
        };

        const onPointerMove = (e) => {
            const rect = dom.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            stateRef.current.mouseXNormalized = (px - 0.5) * 2;
            stateRef.current.mouseYNormalized = (py - 0.5) * 2;

            if (stateRef.current.isPointerDown) {
                const deltaX = e.clientX - stateRef.current.pointerStartX;
                const deltaY = e.clientY - stateRef.current.pointerStartY;
                stateRef.current.pointerStartX = e.clientX;
                stateRef.current.pointerStartY = e.clientY;

                stateRef.current.targetRotationY += deltaX * 0.007;
                stateRef.current.targetRotationX += deltaY * 0.007;
            }
        };

        const onPointerUp = () => {
            stateRef.current.isPointerDown = false;
        };

        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                stateRef.current.isPointerDown = true;
                stateRef.current.pointerStartX = e.touches[0].clientX;
                stateRef.current.pointerStartY = e.touches[0].clientY;
            }
        };

        const onTouchMove = (e) => {
            if (e.touches.length === 1 && stateRef.current.isPointerDown) {
                const deltaX = e.touches[0].clientX - stateRef.current.pointerStartX;
                const deltaY = e.touches[0].clientY - stateRef.current.pointerStartY;
                stateRef.current.pointerStartX = e.touches[0].clientX;
                stateRef.current.pointerStartY = e.touches[0].clientY;

                stateRef.current.targetRotationY += deltaX * 0.007;
                stateRef.current.targetRotationX += deltaY * 0.007;
            }
        };

        const onTouchEnd = () => {
            stateRef.current.isPointerDown = false;
        };

        dom.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);

        dom.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);

        // --- 5. Resize Handling ---
        const handleResize = () => {
            if (!containerRef.current || !renderer) return;
            const newW = containerRef.current.clientWidth || window.innerWidth;
            const newH = containerRef.current.clientHeight || 500;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
            updateGroupPosition(newW, newH);
        };

        window.addEventListener('resize', handleResize);

        // --- 6. Render Loop ---
        const clock = new THREE.Clock();

        const animate = () => {
            animFrameRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            if (!stateRef.current.isPointerDown) {
                stateRef.current.targetRotationY += 0.0035;
                stateRef.current.targetRotationX += 0.001;
            }

            stateRef.current.currentRotationX += (stateRef.current.targetRotationX - stateRef.current.currentRotationX) * 0.08;
            stateRef.current.currentRotationY += (stateRef.current.targetRotationY - stateRef.current.currentRotationY) * 0.08;

            masterGroup.rotation.x = stateRef.current.currentRotationX;
            masterGroup.rotation.y = stateRef.current.currentRotationY;

            camera.position.x += (stateRef.current.mouseXNormalized * 1.5 - camera.position.x) * 0.04;
            camera.position.y += (-stateRef.current.mouseYNormalized * 1.5 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, 0);

            innerMesh.rotation.y -= 0.015;
            innerMesh.rotation.z += 0.01;
            innerWire.rotation.y -= 0.015;
            innerWire.rotation.z += 0.01;

            const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.07;
            innerMesh.scale.set(pulse, pulse, pulse);
            innerWire.scale.set(pulse, pulse, pulse);

            outerMesh.rotation.y += 0.004;
            outerMesh.rotation.x -= 0.002;
            vertexPoints.rotation.y = outerMesh.rotation.y;
            vertexPoints.rotation.x = outerMesh.rotation.x;

            ring1.rotation.z += 0.008;
            ring2.rotation.y -= 0.006;

            sat1.position.x = Math.cos(elapsedTime * 1.6) * 3.6;
            sat1.position.y = Math.sin(elapsedTime * 1.6) * 3.6;

            sat2.position.x = Math.cos(elapsedTime * 1.1) * 4.3;
            sat2.position.z = Math.sin(elapsedTime * 1.1) * 4.3;

            starPoints.rotation.y = elapsedTime * 0.012;

            const posAttr = nodesGeometry.attributes.position;
            const positions = posAttr.array;
            let lineIndex = 0;
            const DIST_THRESHOLD = 1.9;

            for (let i = 0; i < NODE_COUNT; i++) {
                const idx = i * 3;
                positions[idx] += nodeVelocities[i].x;
                positions[idx + 1] += nodeVelocities[i].y;
                positions[idx + 2] += nodeVelocities[i].z;

                const dist = Math.sqrt(
                    positions[idx] ** 2 + positions[idx + 1] ** 2 + positions[idx + 2] ** 2
                );
                if (dist > radiusLimit || dist < 1.4) {
                    nodeVelocities[i].x *= -1;
                    nodeVelocities[i].y *= -1;
                    nodeVelocities[i].z *= -1;
                }

                if (lineIndex < MAX_LINES) {
                    for (let j = i + 1; j < NODE_COUNT; j++) {
                        if (lineIndex >= MAX_LINES) break;
                        const jdx = j * 3;
                        const dx = positions[idx] - positions[jdx];
                        const dy = positions[idx + 1] - positions[jdx + 1];
                        const dz = positions[idx + 2] - positions[jdx + 2];
                        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        if (d < DIST_THRESHOLD) {
                            const lIdx = lineIndex * 6;
                            linePositions[lIdx] = positions[idx];
                            linePositions[lIdx + 1] = positions[idx + 1];
                            linePositions[lIdx + 2] = positions[idx + 2];
                            linePositions[lIdx + 3] = positions[jdx];
                            linePositions[lIdx + 4] = positions[jdx + 1];
                            linePositions[lIdx + 5] = positions[jdx + 2];

                            const alpha = 1.0 - d / DIST_THRESHOLD;
                            lineColors[lIdx] = 0.65 * alpha;
                            lineColors[lIdx + 1] = 0.3 * alpha;
                            lineColors[lIdx + 2] = 0.95 * alpha;

                            lineColors[lIdx + 3] = 0.2 * alpha;
                            lineColors[lIdx + 4] = 0.8 * alpha;
                            lineColors[lIdx + 5] = 0.9 * alpha;

                            lineIndex++;
                        }
                    }
                }
            }

            for (let k = lineIndex * 6; k < MAX_LINES * 6; k++) {
                linePositions[k] = 0;
                lineColors[k] = 0;
            }

            posAttr.needsUpdate = true;
            linesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // --- 7. Cleanup ---
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', handleResize);
            dom.removeEventListener('mousedown', onPointerDown);
            window.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('mouseup', onPointerUp);
            dom.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);

            innerGeo.dispose();
            innerMat.dispose();
            innerWireGeo.dispose();
            innerWireMat.dispose();
            outerGeo.dispose();
            outerMat.dispose();
            ring1Geo.dispose();
            ring1Mat.dispose();
            ring2Geo.dispose();
            ring2Mat.dispose();
            nodesGeometry.dispose();
            nodesMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            starGeo.dispose();
            starMat.dispose();

            renderer.dispose();
            if (container.contains(dom)) {
                container.removeChild(dom);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full cursor-grab active:cursor-grabbing touch-none select-none ${className}`}
            style={{
                maskImage: 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)'
            }}
        />
    );
};

export default ThreeHeroCanvas;
