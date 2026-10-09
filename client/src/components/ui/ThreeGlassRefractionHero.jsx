import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeVertices, mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const MODEL_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb';

const CV_SLIDES = [
  ['Artificial', 'Intelligence', 'Engineer'],
  ['Scalable', 'Full-Stack', 'Systems'],
  ['Machine', 'Learning', 'Architect']
];

/**
 * ThreeGlassRefractionHero
 * Full-screen landing hero with a rotatable 3D glass cuboid
 * refracting the huge background headline with 6-band chromatic dispersion.
 */
const ThreeGlassRefractionHero = ({
  headlineLines,
  projectCount = '09',
  onExploreClick,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(true);
  const [activeDot, setActiveDot] = useState(0); // 0 by default for 'Artificial Intelligence Engineer'

  const activeLines = headlineLines || CV_SLIDES[activeDot] || CV_SLIDES[0];

  // References to communicate with Three.js animation loop and headline canvas
  const spinTriggerRef = useRef(null);
  const drawHeadlineRef = useRef(null);
  const activeLinesRef = useRef(activeLines);
  activeLinesRef.current = activeLines;

  // Seamlessly update headline canvas on activeLines change without re-initializing WebGL
  useEffect(() => {
    if (drawHeadlineRef.current) {
      drawHeadlineRef.current(activeLines);
    }
  }, [activeLines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heroSection = containerRef.current;
    if (!canvas || !heroSection) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const DPR = Math.min(window.devicePixelRatio || 1, 2.5);
    renderer.setPixelRatio(DPR);

    // --- Cameras & Scenes ---
    const scene = new THREE.Scene();
    const bgScene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- Scene Graph for Cube ---
    const pivot = new THREE.Group();
    const spinner = new THREE.Group();
    pivot.add(spinner);
    scene.add(pivot);

    // Initial spinner rotation: Euler(-0.42, 0.62, 0.18)
    spinner.rotation.set(-0.42, 0.62, 0.18);

    // --- Offscreen 2D Canvas for Headline ---
    const hlCanvas = document.createElement('canvas');
    const hlCtx = hlCanvas.getContext('2d');
    const hlTexture = new THREE.CanvasTexture(hlCanvas);
    hlTexture.colorSpace = THREE.SRGBColorSpace;
    hlTexture.minFilter = THREE.LinearFilter;
    hlTexture.magFilter = THREE.LinearFilter;
    hlTexture.generateMipmaps = false;

    // Background Fullscreen Quad
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: hlTexture }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uTex, vUv);
          #include <colorspace_fragment>
        }
      `,
      depthTest: false,
      depthWrite: false
    });
    const bgQuad = new THREE.Mesh(quadGeo, quadMat);
    bgQuad.frustumCulled = false;
    bgScene.add(bgQuad);

    // --- Shaders for 6-Band Chromatic Dispersion Glass ---
    const glassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vEye;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec4 mvPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPos;
        vNormal = normalize(normalMatrix * normal);
        vEye = normalize(mvPos.xyz);
      }
    `;

    const glassFragmentShader = `
      uniform vec2 uResolution;
      uniform sampler2D uTexture;
      uniform float uIorR;
      uniform float uIorY;
      uniform float uIorG;
      uniform float uIorC;
      uniform float uIorB;
      uniform float uIorP;
      uniform float uRefractPower;
      uniform float uChromatic;
      uniform float uSaturation;
      uniform float uShininess;
      uniform float uDiffuseness;
      uniform float uFresnelPower;
      uniform vec3 uLight;
      uniform float uBackside;

      varying vec3 vNormal;
      varying vec3 vEye;

      float specular(vec3 lightDir, vec3 n, vec3 eye, float shininess, float diffuseness) {
        vec3 l = normalize(-lightDir);
        vec3 v = -eye;
        vec3 h = normalize(l + v);
        float spec = pow(max(dot(n, h), 0.0), shininess);
        float diff = max(0.0, dot(n, l)) * diffuseness;
        return spec + diff;
      }

      float luma(vec3 c) {
        return dot(c, vec3(0.2125, 0.7154, 0.0721));
      }

      const int LOOP = 16;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 n = normalize(vNormal);
        if (uBackside > 0.5) {
          n = -n;
        }
        vec3 eye = normalize(vEye);

        vec3 color = vec3(0.0);

        for (int i = 0; i < LOOP; i++) {
          // Tighter chromatic dispersion slide for crystal-clear optical transparency
          float slide = float(i) / float(LOOP) * 0.012;

          vec3 refrR = refract(eye, n, 1.0 / uIorR);
          vec3 refrY = refract(eye, n, 1.0 / uIorY);
          vec3 refrG = refract(eye, n, 1.0 / uIorG);
          vec3 refrC = refract(eye, n, 1.0 / uIorC);
          vec3 refrB = refract(eye, n, 1.0 / uIorB);
          vec3 refrP = refract(eye, n, 1.0 / uIorP);

          vec2 uvR = uv + refrR.xy * (uRefractPower + slide * 1.0) * uChromatic;
          vec2 uvY = uv + refrY.xy * (uRefractPower + slide * 1.0) * uChromatic;
          vec2 uvG = uv + refrG.xy * (uRefractPower + slide * 1.8) * uChromatic;
          vec2 uvC = uv + refrC.xy * (uRefractPower + slide * 2.2) * uChromatic;
          vec2 uvB = uv + refrB.xy * (uRefractPower + slide * 2.6) * uChromatic;
          vec2 uvP = uv + refrP.xy * (uRefractPower + slide * 1.0) * uChromatic;

          vec4 texR = texture2D(uTexture, uvR);
          vec4 texY = texture2D(uTexture, uvY);
          vec4 texG = texture2D(uTexture, uvG);
          vec4 texC = texture2D(uTexture, uvC);
          vec4 texB = texture2D(uTexture, uvB);
          vec4 texP = texture2D(uTexture, uvP);

          float r = texR.r * 0.5;
          float y = (texY.r * 2.0 + texY.g * 2.0 - texY.b) / 6.0;
          float g = texG.g * 0.5;
          float c = (texC.g * 2.0 + texC.b * 2.0 - texC.r) / 6.0;
          float b = texB.b * 0.5;
          float p = (texP.b * 2.0 + texP.r * 2.0 - texP.g) / 6.0;

          float R_col = r + (2.0 * p + 2.0 * y - c) / 3.0;
          float G_col = g + (2.0 * y + 2.0 * c - p) / 3.0;
          float B_col = b + (2.0 * c + 2.0 * p - y) / 3.0;

          color += vec3(R_col, G_col, B_col);
        }

        color /= float(LOOP);

        // Deeper contrast absorption inside the glass body for richer depth
        color *= 0.94;

        // Spectral rainbow color palette function for delicate prism diffraction on edges
        // phase-shifted cosine spectrum: red -> gold -> green -> cyan -> violet
        vec3 spectralRainbow = 0.5 + 0.5 * cos(6.28318 * (dot(n, vec3(0.577)) * 0.8 + vec3(0.0, 0.33, 0.67)));

        // Specular reflections: crisp, high polish finish
        float spec1 = specular(uLight, n, eye, uShininess, uDiffuseness);
        float spec2 = specular(vec3(1.4, -0.8, 1.2), n, eye, uShininess * 1.4, uDiffuseness * 0.3);
        float specVal = spec1 + 0.85 * spec2;
        color += specVal * (uBackside > 0.5 ? 0.35 : 1.3);

        // Crisp Fresnel rim lighting with subtle prismatic chromatic fringe
        float rim = pow(clamp(1.0 + dot(eye, n), 0.0, 1.0), 2.8);
        vec3 rimColor = mix(vec3(1.0, 1.0, 1.0), spectralRainbow, 0.42);
        color = mix(color, rimColor, rim * (uBackside > 0.5 ? 0.35 : 0.75));

        // Precision edge & corner chamfer highlight with soft iridescent rainbow glint
        vec3 dNx = dFdx(n);
        vec3 dNy = dFdy(n);
        float edgeVal = length(dNx) + length(dNy);
        float edgeGlint = smoothstep(0.02, 0.14, edgeVal);
        vec3 edgeRainbow = mix(vec3(1.0, 1.0, 1.0), spectralRainbow, 0.55);
        color += edgeRainbow * edgeGlint * (uBackside > 0.5 ? 0.35 : 1.15);

        // Corner sparkle at 8 vertex intersections with diamond dispersion prism
        float cornerVal = length(dNx) * length(dNy);
        float cornerGlint = smoothstep(0.0008, 0.010, cornerVal);
        vec3 cornerRainbow = mix(vec3(1.0, 1.0, 1.0), spectralRainbow, 0.65);
        color += cornerRainbow * cornerGlint * (uBackside > 0.5 ? 0.4 : 1.6);

        color += vec3(0.001, 0.001, 0.002);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `;

    // Render Targets
    let rtBack = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true
    });
    let rtFront = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true
    });

    const createUniforms = (backside, refractPower) => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTexture: { value: null },
      uIorR: { value: 1.14 },
      uIorY: { value: 1.15 },
      uIorG: { value: 1.16 },
      uIorC: { value: 1.18 },
      uIorB: { value: 1.18 },
      uIorP: { value: 1.18 },
      uRefractPower: { value: refractPower },
      uChromatic: { value: 0.38 },
      uSaturation: { value: 1.12 },
      uShininess: { value: 160.0 },
      uDiffuseness: { value: 0.008 },
      uFresnelPower: { value: 3.5 },
      uLight: { value: new THREE.Vector3(-1.0, 1.2, 1.0) },
      uBackside: { value: backside }
    });

    const backMat = new THREE.ShaderMaterial({
      uniforms: createUniforms(1.0, 0.10),
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      side: THREE.BackSide
    });
    backMat.uniforms.uTexture.value = rtBack.texture;

    const frontMat = new THREE.ShaderMaterial({
      uniforms: createUniforms(0.0, 0.16),
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      side: THREE.FrontSide
    });
    frontMat.uniforms.uTexture.value = rtFront.texture;

    // --- Cube Mesh: Sharp, angular mathematical glass cube (zero rounding, crisp edges & corners) ---
    const crystalGeo = new RoundedBoxGeometry(1, 1, 1, 1, 0.005);
    const cubeMesh = new THREE.Mesh(crystalGeo, frontMat);
    spinner.add(cubeMesh);

    // Razor-sharp crystalline perimeter edge definition
    const boxWireGeo = new THREE.EdgesGeometry(crystalGeo, 15);
    const boxWireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.LineSegments(boxWireGeo, boxWireMat);
    spinner.add(wireMesh);

    // --- Headline Canvas Drawing & Layout ---
    let viewportW = 1440;
    let viewportH = 806;

    const drawHeadline = (linesToDraw) => {
      const W = viewportW;
      const H = viewportH;
      const dpr = DPR;

      hlCanvas.width = W * dpr;
      hlCanvas.height = H * dpr;

      hlCtx.save();
      hlCtx.scale(dpr, dpr);
      hlCtx.fillStyle = '#000000';
      hlCtx.fillRect(0, 0, W, H);

      // Reduced, sleek, and refined headline font size
      const mobile = (W < 768) || (W / H < 1);
      let fs = Math.min(H * 0.155, W * (mobile ? 0.13 : 0.078));

      hlCtx.font = `800 ${fs}px 'Poppins', sans-serif`;
      const lines = linesToDraw || activeLinesRef.current;

      let maxLineWidth = 0;
      for (const line of lines) {
        const mw = hlCtx.measureText(line).width;
        if (mw > maxLineWidth) maxLineWidth = mw;
      }

      const maxAllowed = W * (mobile ? 0.85 : 0.55);
      if (maxLineWidth > maxAllowed) {
        fs = fs * (maxAllowed / maxLineWidth);
        hlCtx.font = `800 ${fs}px 'Poppins', sans-serif`;
      }

      const cx = W * (mobile ? 0.5 : 0.505);
      const cy = H * (mobile ? 0.44 : 0.468);
      const gap = fs * 1.05;
      const cap = fs * 0.7;

      hlCtx.textAlign = 'center';
      hlCtx.textBaseline = 'alphabetic';
      hlCtx.fillStyle = '#f0f0f2';

      lines.forEach((line, i) => {
        const y = cy + cap / 2 + (i - 1) * gap;
        hlCtx.fillText(line, cx, y);
      });

      hlCtx.restore();
      hlTexture.needsUpdate = true;
    };

    drawHeadlineRef.current = drawHeadline;

    const layout = () => {
      if (!heroSection || !renderer) return;
      viewportW = heroSection.clientWidth || window.innerWidth;
      viewportH = heroSection.clientHeight || window.innerHeight;

      const W = viewportW;
      const H = viewportH;
      const aspect = W / H;

      renderer.setSize(W, H);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      const dpr = DPR;
      const drawW = Math.floor(W * dpr);
      const drawH = Math.floor(H * dpr);

      rtBack.setSize(drawW, drawH);
      rtFront.setSize(drawW, drawH);

      backMat.uniforms.uResolution.value.set(drawW, drawH);
      frontMat.uniforms.uResolution.value.set(drawW, drawH);

      drawHeadline();

      // Cube placement & comfortably scaled focus (neat, refined, well-proportioned)
      const mobile = (W < 768) || (W / H < 1);
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * aspect;

      const sx = mobile ? 0.5 : 0.515;
      const sy = mobile ? 0.45 : 0.485;
      pivot.position.set((sx - 0.5) * visW, (0.5 - sy) * visH, 0);

      const px = Math.min(H * 0.45, W * (mobile ? 0.44 : 0.29));
      const s = (px / H) * visH;
      pivot.scale.set(s, s, s);
    };

    window.addEventListener('resize', layout);
    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', drawHeadline);
    }

    // --- Interaction & Physics ---
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let lastMoveTime = 0;
    let releaseTime = 0;
    let remainingStepY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velX = 0;
      velY = 0;
      remainingStepY = 0;
      lastMoveTime = performance.now();
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add('dragging');
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const now = performance.now();
      const dtMove = Math.max(1, now - lastMoveTime);
      const dx = (e.clientX - lastX) * 0.008;
      const dy = (e.clientY - lastY) * 0.008;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = now;

      const frameScale = 16.67 / dtMove;
      velX = dx * frameScale;
      velY = dy * frameScale;

      const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx);
      const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy);
      spinner.quaternion.premultiply(qY).premultiply(qX);
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.classList.remove('dragging');
      releaseTime = performance.now();
      if (e && e.pointerId) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // Register external spin trigger for Prev / Next arrows
    spinTriggerRef.current = (deltaAngle) => {
      velX = 0;
      velY = 0;
      remainingStepY += deltaAngle;
    };

    // --- Render Loop ---
    let animFrameId = null;
    let lastFrameTime = performance.now();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      let dt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      if (dt > 0.05) dt = 0.05;

      const dt60 = dt * 60;

      if (!isDragging) {
        if (Math.abs(remainingStepY) > 0.0005) {
          const step = remainingStepY * Math.min(1, 0.09 * dt60);
          remainingStepY -= step;
          const qStep = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), step);
          spinner.quaternion.premultiply(qStep);
        } else {
          remainingStepY = 0;

          if (Math.abs(velX) > 0.00001 || Math.abs(velY) > 0.00001) {
            const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), velX * dt60);
            const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), velY * dt60);
            spinner.quaternion.premultiply(qY).premultiply(qX);
            const damp = Math.pow(0.94, dt60);
            velX *= damp;
            velY *= damp;
          }

          const timeSinceRelease = (now - releaseTime) / 1000;
          if (timeSinceRelease > 0.6) {
            const blend = Math.min(1, (timeSinceRelease - 0.6) / 1.0);
            const driftY = 0.0035 * blend * dt60;
            const driftX = 0.0012 * blend * dt60;
            const qDriftY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), driftY);
            const qDriftX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), driftX);
            spinner.quaternion.premultiply(qDriftY).premultiply(qDriftX);
          }
        }
      }

      if (cubeMesh) {
        renderer.setRenderTarget(rtBack);
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        renderer.setRenderTarget(rtFront);
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        cubeMesh.material = backMat;
        renderer.autoClear = false;
        renderer.render(scene, camera);

        renderer.setRenderTarget(null);
        renderer.autoClear = true;
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        renderer.autoClear = false;
        renderer.clearDepth();
        cubeMesh.material = frontMat;
        renderer.render(scene, camera);
      }
    };

    // Wait for fonts before layout & loop
    const fontPromise = Promise.race([
      Promise.all([
        document.fonts ? document.fonts.load("800 100px 'Poppins'") : Promise.resolve(),
        document.fonts ? document.fonts.ready : Promise.resolve()
      ]),
      new Promise((res) => setTimeout(res, 2500))
    ]);

    fontPromise.then(() => {
      layout();
      animate();
    });

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', layout);
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', drawHeadline);
      }
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);

      renderer.dispose();
      rtBack.dispose();
      rtFront.dispose();
      hlTexture.dispose();
      quadGeo.dispose();
      quadMat.dispose();
      backMat.dispose();
      frontMat.dispose();
      crystalGeo.dispose();
      boxWireGeo.dispose();
      boxWireMat.dispose();
    };
  }, []);

  const handlePrev = () => {
    setActiveDot((prev) => (prev - 1 + CV_SLIDES.length) % CV_SLIDES.length);
    if (spinTriggerRef.current) spinTriggerRef.current(Math.PI / 2);
  };

  const handleNext = () => {
    setActiveDot((prev) => (prev + 1) % CV_SLIDES.length);
    if (spinTriggerRef.current) spinTriggerRef.current(-Math.PI / 2);
  };

  const handleDotClick = (idx) => {
    if (idx === activeDot) return;
    const diff = idx - activeDot;
    setActiveDot(idx);
    if (spinTriggerRef.current) spinTriggerRef.current(diff * (Math.PI / 2));
  };

  return (
    <section className="hero relative w-full h-screen min-h-[520px] overflow-hidden bg-black" ref={containerRef} id="hero">
      <canvas
        ref={canvasRef}
        id="scene"
        aria-label="Rotatable glass cube. Drag to rotate."
        className="absolute inset-0 w-full h-full block cursor-grab touch-none"
      />

      <div className="ui absolute inset-0 pointer-events-none z-10">
        <h1 className="sr-only">{activeLines.join(' ')}</h1>

        {/* NAV HEADER */}
        <header className="nav absolute top-[clamp(24px,4.7vh,40px)] left-[var(--pad-x)] right-[var(--pad-x)] flex items-center justify-between z-20">
          <a href="#hero" className="logo flex items-center gap-2.5 text-white no-underline text-[15px] tracking-tight pointer-events-auto group">
            <span className="w-8 h-8 rounded-lg bg-white text-black font-black text-xs flex items-center justify-center font-mono group-hover:scale-105 transition-transform">
              VS
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm tracking-wide">VEERANUTH</span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">AI & FULL STACK</span>
            </div>
          </a>
          <ul className="nav-links flex items-center gap-[clamp(16px,2.5vw,40px)] list-none pointer-events-auto">
            <li>
              <a href="#hero" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors">
                Selected Works
              </a>
            </li>
            <li>
              <a href="#skills" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors hidden sm:inline">
                Skills
              </a>
            </li>
            <li>
              <a href="#github" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors hidden md:inline">
                Skyline
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 no-underline text-[14px] font-medium relative hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a
                href="/Veeranuth_Sukluea_CV.pdf"
                download="Veeranuth_Sukluea_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-xs font-mono text-white transition-all duration-200"
              >
                <span>CV</span>
                <span>↓</span>
              </a>
            </li>
          </ul>
        </header>

        {/* ARROWS */}
        <div className="arrows absolute top-[18.9%] left-[76.7%] flex gap-8 -translate-x-[19px] -translate-y-1/2 pointer-events-auto z-20 max-[900px]:left-auto max-[900px]:right-[var(--pad-x)] max-[900px]:top-[15%] max-[900px]:translate-y-[-50%] max-[900px]:gap-3.5">
          <button
            onClick={handlePrev}
            className="arrow w-[38px] h-[38px] rounded-full border-[1.5px] border-white/40 bg-black/40 backdrop-blur-md text-white grid place-items-center cursor-pointer transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
            aria-label="Previous"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="arrow w-[38px] h-[38px] rounded-full border-[1.5px] border-white/40 bg-black/40 backdrop-blur-md text-white grid place-items-center cursor-pointer transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
            aria-label="Next"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* PAGINATION DOTS */}
        <nav className="dots absolute right-[calc(var(--pad-x)-7px)] top-[49.4%] -translate-y-1/2 flex flex-col gap-[33px] pointer-events-auto z-20 max-[640px]:gap-5 max-[640px]:right-4">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`dot w-[14px] h-[14px] rounded-full border-2 border-white cursor-pointer transition-all max-[640px]:w-2.5 max-[640px]:h-2.5 ${
                activeDot === idx ? 'bg-transparent' : 'bg-white'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </nav>

        {/* TAGLINE */}
        <div className="tagline absolute left-[var(--pad-x)] bottom-[clamp(35px,6.5vh,60px)] pointer-events-auto max-[900px]:bottom-[clamp(140px,18vh,200px)]">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 mb-2">
            AI Research → Production Scale
          </div>
          <p className="text-[clamp(24px,2.5vw,42px)] leading-[1.15] font-light tracking-tight text-white">
            Architecting Scalable<br />
            <strong className="font-bold block text-white">AI & High-Concurrency Systems.</strong>
          </p>
        </div>

        {/* CTA ROW */}
        <div className="cta-row absolute left-[45.6%] right-0 bottom-4 sm:bottom-6 flex items-center pointer-events-auto z-20 max-[900px]:left-[var(--pad-x)] max-[900px]:bottom-6">
          <a
            href="#projects"
            onClick={onExploreClick}
            className="cta flex-none px-5 h-12 inline-flex items-center gap-2 border-[1.5px] border-white/60 hover:border-white rounded-lg bg-black/40 backdrop-blur-md text-white text-sm font-medium no-underline cursor-pointer transition-all duration-200 hover:bg-white hover:text-black shadow-lg"
          >
            <span>Explore Selected Works</span>
            <span className="text-xs font-mono">({projectCount})</span>
          </a>
          <span className="cta-line flex-1 h-[1px] bg-white/30 min-w-[30px] ml-4 mr-2" />
          <span className="count flex-none text-[clamp(90px,13vw,220px)] font-light leading-none tracking-tight text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.7)] select-none pr-4 sm:pr-8">
            {projectCount}
          </span>
        </div>

        {/* LOADER */}
        <div className={`loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs tracking-[0.2em] uppercase transition-opacity duration-600 pointer-events-none ${
          modelLoaded ? 'opacity-0' : 'opacity-60 text-white'
        }`}>
          Loading model
        </div>
      </div>
    </section>
  );
};

export default ThreeGlassRefractionHero;
