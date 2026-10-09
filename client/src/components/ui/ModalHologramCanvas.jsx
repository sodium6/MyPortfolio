import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Workflow, Activity, ArrowRight, Zap } from 'lucide-react';

/**
 * PROJECT_PIPELINES
 * Real-world architectural workflows for each of the 9 projects
 */
export const PROJECT_PIPELINES = {
    'procurement-strategy': {
        type: 'Dual-Engine Clean Architecture & Strategic AI Pipeline',
        stages: [
            { step: '01', name: 'Spend Ledger Ingestion', desc: 'Raw transactional procurement records & catalog manifests', tech: 'ETL Pipeline' },
            { step: '02', name: 'Go 1.22 Core Engine', desc: 'Clean Architecture high-throughput computation service', tech: 'Go (Golang)' },
            { step: '03', name: 'Strategic Matrices', desc: 'Pareto ABC 80/20 & Kraljic supply positioning analysis', tech: 'ABC / Kraljic' },
            { step: '04', name: 'FastAPI AI Advisor', desc: 'Retrieval-Augmented Generation over procurement literature', tech: 'Python / RAG' },
            { step: '05', name: 'Directives & Roadmap', desc: '16-Cell strategic action directives & 9-Level SRM transition', tech: 'Supabase / DB' }
        ]
    },
    'pea-hackathon': {
        type: 'Regional Anomaly Detection & Time-Series Auto-ML Pipeline',
        stages: [
            { step: '01', name: '14 Regional Ingestion', desc: 'Multi-zone procurement plan data aggregation', tech: 'Prisma / Next.js' },
            { step: '02', name: 'Anomaly Detection', desc: 'Statistical Z-score (|Z| > 2) with Human-in-the-Loop gate', tech: 'NestJS / Z-Score' },
            { step: '03', name: 'LME Global Indices', desc: 'Exogenous market correlation (Copper & Aluminium LME)', tech: 'yfinance / API' },
            { step: '04', name: '24-Mo ARIMAX Forecast', desc: 'Auto-ML comparison: ARIMAX vs ARIMA vs Holt-Winters', tech: 'Python / statsmodels' },
            { step: '05', name: 'Buy Signal Engine', desc: 'Multi-factor scoring: Price, Inventory, Capacity & Deadline', tech: 'FastAPI / LLM' }
        ]
    },
    'e-bidding': {
        type: 'ISO/IEC 29110 Secure Bidding Lifecycle Architecture',
        stages: [
            { step: '01', name: 'Sourcing & TOR Setup', desc: 'Dynamic pricing tables & RFP/RFQ commercial templates', tech: 'Next.js 14 / TOR' },
            { step: '02', name: 'Participant Portal', desc: 'Supplier bid submission & surrogate bidding with audit trail', tech: 'Azure AD / SSO' },
            { step: '03', name: 'Sealed Envelope Vault', desc: 'Tamper-proof encryption hiding prices until opening event', tech: 'PostgreSQL / Security' },
            { step: '04', name: 'Evaluation Engine', desc: 'Automated commercial, credit terms & technical criteria scoring', tech: 'NestJS / TypeScript' },
            { step: '05', name: 'Board Approval Flow', desc: 'Secretary verification → Board sign-off → Memo generator', tech: 'ISO/IEC 29110' }
        ]
    },
    'pimmz-club': {
        type: 'High-Concurrency Multi-Core Cluster & In-Memory Pipeline',
        stages: [
            { step: '01', name: 'Traffic Ingress', desc: '1,000–10,000 concurrent Virtual Users load distribution', tech: 'k6 Benchmark' },
            { step: '02', name: 'Node.js Cluster', desc: 'Multi-core CPU clustering & process worker management', tech: 'Node.js Cluster' },
            { step: '03', name: 'SWR Cache Layer', desc: 'Stale-While-Revalidate in-memory cache slashing DB load >95%', tech: 'Memory Cache' },
            { step: '04', name: 'Indexed MySQL 8.0', desc: 'B-Tree composite indexing reducing latency from 2.7s to 1.6ms', tech: 'MySQL 8.0' },
            { step: '05', name: 'Smart Connect SSO', desc: 'Unified single sign-on & purchaser tier privileges', tech: 'Express / SSO' }
        ]
    },
    'amc-training': {
        type: 'Modern EdTech Bento Architecture & Workflow Pipeline',
        stages: [
            { step: '01', name: 'Dual Registration', desc: 'Separate corporate entity manifests and individual workflows', tech: 'React / Vite' },
            { step: '02', name: 'Slip Audit & PDPA', desc: 'Payment slip upload verification and legal PDPA consent', tech: 'Node.js / Express' },
            { step: '03', name: 'Lecturer Hub', desc: 'Speaker directory with embedded PDF CV preview & repository', tech: 'PDF Hub / Bento' },
            { step: '04', name: 'Admin Back-Office', desc: 'Course management, KPI monitoring & article exchange', tech: 'RESTful API' },
            { step: '05', name: 'Excel Export Engine', desc: 'Structured .xlsx attendee manifests for administration', tech: 'xlsx Engine' }
        ]
    },
    'restaurant-rec': {
        type: 'Hybrid ML Recommendation & Vector Search Pipeline',
        stages: [
            { step: '01', name: 'User Preference Profiling', desc: 'User interaction vectors, cuisine ratings & taste profiling', tech: 'React (Vite)' },
            { step: '02', name: 'Hybrid ML Blend', desc: 'User-Based Collaborative Filtering + Content-Based Cosine', tech: 'scikit-learn / pandas' },
            { step: '03', name: 'pgvector Semantic Store', desc: 'High-dimensional vector embedding similarity lookup in SQL', tech: 'PostgreSQL / pgvector' },
            { step: '04', name: 'Cold-Start Strategy', desc: 'Popularity fallback chain with Precision/Recall/F1 metrics', tech: 'FastAPI / Python' },
            { step: '05', name: 'OpenRouter Thai LLM', desc: 'Conversational Thai explanation engine ("ทำไมถึงแนะนำร้านนี้")', tech: 'OpenRouter LLM' }
        ]
    },
    'rag-product-search': {
        type: 'Dense Embeddings & Local SLM Product Discovery Pipeline',
        stages: [
            { step: '01', name: 'User Natural Query', desc: 'Conversational product search & semantic intent capture', tech: 'Web Interface' },
            { step: '02', name: 'Dense Embedding', desc: 'BAAI/bge-m3 high-dimensional vector representations', tech: 'bge-m3 Embeddings' },
            { step: '03', name: 'Hybrid Search Engine', desc: 'Supabase PostgreSQL vector similarity + keyword matching', tech: 'Supabase / pgvector' },
            { step: '04', name: 'Local SLM Inference', desc: 'Gemma3:1b local model via Ollama with zero cloud latency', tech: 'gemma3:1b (Ollama)' },
            { step: '05', name: 'FastAPI Gateway', desc: 'Asynchronous streaming REST endpoints for sub-second queries', tech: 'FastAPI / Python' }
        ]
    },
    'air-writing': {
        type: 'Real-Time Computer Vision & CNN Character Recognition Pipeline',
        stages: [
            { step: '01', name: 'Video Ingress', desc: '30 FPS real-time webcam video stream capture', tech: 'OpenCV / Python' },
            { step: '02', name: 'Hand Tracking', desc: 'MediaPipe 21-point 3D hand skeleton & fingertip coordinates', tech: 'MediaPipe Hands' },
            { step: '03', name: 'Trajectory Recording', desc: 'Continuous spatial trajectory tracking & stroke synthesis', tech: 'Vector Tracking' },
            { step: '04', name: 'Stroke Normalization', desc: 'Canvas centering, stroke skeletonization & preprocessing', tech: 'Image Processing' },
            { step: '05', name: 'CNN Classification', desc: 'Dual architecture (VGG16 vs MobileNetV2) with 97% accuracy', tech: 'Deep Learning CNN' }
        ]
    },
    'emotion-detection': {
        type: 'Facial Emotion Detection & Deep Learning Serving Pipeline',
        stages: [
            { step: '01', name: 'Video Stream Capture', desc: 'Real-time multi-face video feed capture from webcam', tech: 'OpenCV / Python' },
            { step: '02', name: 'Face Localization', desc: 'Face detection, bounding box extraction & alignment', tech: 'Cascade / DNN' },
            { step: '03', name: 'Data Preprocessing', desc: 'Grayscale normalization & image augmentation for balance', tech: 'Data Pipeline' },
            { step: '04', name: 'CNN Emotion Model', desc: 'Fine-tuned convolutional neural network multi-class classifier', tech: 'Deep Learning CNN' },
            { step: '05', name: 'Flask REST API', desc: 'Asynchronous REST inference server delivering real-time labels', tech: 'Flask REST' }
        ]
    }
};

/**
 * ModalHologramCanvas
 * Interactive 3D System Architecture Pipeline tailored 100% to each project
 */
const ModalHologramCanvas = ({ project = {} }) => {
    const containerRef = useRef(null);
    const [activeStageIndex, setActiveStageIndex] = useState(0);

    const pipelineData = PROJECT_PIPELINES[project.id] || {
        type: 'End-to-End System Pipeline',
        stages: [
            { step: '01', name: 'Client Ingress', desc: 'Frontend user requests & presentation layer', tech: 'Frontend' },
            { step: '02', name: 'API Gateway', desc: 'Routing, auth validation & rate limiting', tech: 'Gateway' },
            { step: '03', name: 'Core Engine', desc: 'Business logic & specialized processing service', tech: 'Backend' },
            { step: '04', name: 'Data & Vectors', desc: 'Persistence, caching & high-speed queries', tech: 'Database' },
            { step: '05', name: 'Response Stream', desc: 'Verified output delivered to users with low latency', tech: 'Delivery' }
        ]
    };

    const isEnterprise = project.category === 'enterprise';

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || 360;
        let height = container.clientHeight || 150;

        // --- 1. Scene, Camera, Renderer ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
        camera.position.set(0, 1.8, 5.2);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // --- 2. Color Palette ---
        const primaryColor = isEnterprise ? 0x06b6d4 : 0xa855f7;
        const accentColor = isEnterprise ? 0x3b82f6 : 0xec4899;
        const glowColor = isEnterprise ? 0x67e8f9 : 0xd8b4fe;

        // --- 3. Lights ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);

        const pLight = new THREE.PointLight(primaryColor, 4, 25);
        pLight.position.set(2, 4, 4);
        scene.add(pLight);

        // --- 4. 3D Pipeline Nodes along a Horizontal Flow ---
        const masterGroup = new THREE.Group();
        scene.add(masterGroup);

        const nodeCount = 5;
        const spacing = 1.05;
        const startX = -((nodeCount - 1) * spacing) / 2;
        const nodePositions = [];
        const nodeMeshes = [];
        const disposables = [];

        for (let i = 0; i < nodeCount; i++) {
            const x = startX + i * spacing;
            const y = Math.sin((i / (nodeCount - 1)) * Math.PI) * 0.3 - 0.05;
            const z = (i % 2 === 1 ? -0.15 : 0.15);
            nodePositions.push(new THREE.Vector3(x, y, z));

            // Outer floating cyber node box
            const boxGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
            const boxMat = new THREE.MeshPhongMaterial({
                color: i === activeStageIndex ? accentColor : primaryColor,
                emissive: i === activeStageIndex ? accentColor : primaryColor,
                emissiveIntensity: i === activeStageIndex ? 0.85 : 0.35,
                transparent: true,
                opacity: 0.85,
                shininess: 90
            });
            const nodeMesh = new THREE.Mesh(boxGeo, boxMat);
            nodeMesh.position.set(x, y, z);

            // Wireframe accent border
            const edges = new THREE.EdgesGeometry(boxGeo);
            const edgeMat = new THREE.LineBasicMaterial({
                color: glowColor,
                transparent: true,
                opacity: 0.6
            });
            const wire = new THREE.LineSegments(edges, edgeMat);
            nodeMesh.add(wire);

            masterGroup.add(nodeMesh);
            nodeMeshes.push(nodeMesh);
            disposables.push(boxGeo, boxMat, edges, edgeMat);
        }

        // Connecting Laser Pipeline Curves
        const curvePoints = [];
        for (let i = 0; i < nodePositions.length; i++) {
            curvePoints.push(nodePositions[i]);
        }
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.03, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
            color: primaryColor,
            transparent: true,
            opacity: 0.5
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        masterGroup.add(tube);
        disposables.push(tubeGeo, tubeMat);

        // Continuous Moving Data Packets (Throughput pulses)
        const packetCount = 8;
        const packetGeo = new THREE.SphereGeometry(0.065, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const packets = [];
        disposables.push(packetGeo, packetMat);

        for (let i = 0; i < packetCount; i++) {
            const pMesh = new THREE.Mesh(packetGeo, packetMat);
            masterGroup.add(pMesh);
            packets.push({
                mesh: pMesh,
                progress: (i / packetCount)
            });
        }

        // --- 5. Interactive Mouse Parallax ---
        let targetRotX = 0;
        let targetRotY = 0;

        const onMouseMove = (e) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            targetRotY = x * 0.45;
            targetRotX = -y * 0.35;
        };

        const onMouseLeave = () => {
            targetRotX = 0;
            targetRotY = 0;
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        // --- 6. Resize Handler ---
        const handleResize = () => {
            if (!container) return;
            const newW = container.clientWidth || 360;
            const newH = container.clientHeight || 150;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        // --- 7. Animation Loop ---
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // Smooth floating
            masterGroup.position.y = Math.sin(time * 1.5) * 0.05;

            // Parallax tilt
            masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.08;
            masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.08;

            // Move data packets along the real pipeline curve
            packets.forEach((p) => {
                p.progress = (p.progress + delta * 0.35) % 1.0;
                const pos = curve.getPointAt(p.progress);
                p.mesh.position.copy(pos);
            });

            // Gentle rotation for the active node
            nodeMeshes.forEach((mesh, idx) => {
                mesh.rotation.y += delta * (idx === activeStageIndex ? 1.2 : 0.4);
                mesh.rotation.x += delta * 0.2;
            });

            renderer.render(scene, camera);
        };

        animate();

        // --- 8. Cleanup ---
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            if (container) {
                container.removeEventListener('mousemove', onMouseMove);
                container.removeEventListener('mouseleave', onMouseLeave);
            }
            disposables.forEach((item) => item.dispose());
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [project.id, activeStageIndex]);

    return (
        <div className="relative w-full rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-4 sm:p-5 overflow-hidden transition-all hover:border-purple-500/30">
            {/* Ambient Ambient Glow */}
            <div
                className={`absolute inset-0 opacity-15 blur-3xl pointer-events-none ${
                    isEnterprise
                        ? 'bg-gradient-to-tr from-cyan-600/30 via-indigo-600/20 to-transparent'
                        : 'bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-transparent'
                }`}
            />

            {/* Header: Project-Specific Pipeline Name */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-2 pb-2.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-purple-400" />
                    <div>
                        <div className="text-xs font-mono font-bold tracking-wider uppercase text-gray-200">
                            Architecture & Dataflow Pipeline
                        </div>
                        <div className="text-[10px] font-mono text-purple-300/80">
                            {pipelineData.type}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>3D Interactive</span>
                </div>
            </div>

            {/* 3D Interactive Pipeline Canvas */}
            <div
                ref={containerRef}
                className="relative z-10 w-full h-[130px] sm:h-[150px] cursor-crosshair"
                title="Hover to tilt and inspect architectural pipeline"
            />

            {/* Vertical Flow of the 5 Project-Specific Stages (Clean, readable, 100% relevant) */}
            <div className="relative z-10 mt-2 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center justify-between px-1">
                    <span>System Execution Flow (Click to Focus)</span>
                    <span className="text-purple-400">Node {activeStageIndex + 1} of 5</span>
                </div>

                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                    {pipelineData.stages.map((stg, idx) => {
                        const isActive = idx === activeStageIndex;
                        return (
                            <div
                                key={stg.step}
                                onClick={() => setActiveStageIndex(idx)}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                    isActive
                                        ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-950/30'
                                        : 'bg-black/30 hover:bg-black/50 border-white/5 hover:border-white/15'
                                }`}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 border ${
                                            isActive
                                                ? 'bg-purple-500 text-white border-purple-400'
                                                : 'bg-white/5 text-purple-300 border-white/10'
                                        }`}
                                    >
                                        {stg.step}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-xs font-semibold text-gray-200 truncate">
                                            {stg.name}
                                        </div>
                                        <div className="text-[10px] text-gray-400 truncate">
                                            {stg.desc}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-purple-200/90 border border-white/5 flex-shrink-0">
                                    {stg.tech}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ModalHologramCanvas;
