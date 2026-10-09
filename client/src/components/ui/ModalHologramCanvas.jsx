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
        type: 'Enterprise Multi-Core Cluster & In-Memory Pipeline',
        stages: [
            { step: '01', name: 'Traffic Ingress', desc: 'Secure web gateway & request routing', tech: 'Ingress Gateway' },
            { step: '02', name: 'Node.js Cluster', desc: 'Multi-core CPU clustering & process worker management', tech: 'Node.js Cluster' },
            { step: '03', name: 'SWR Cache Layer', desc: 'Stale-While-Revalidate in-memory caching layer', tech: 'Memory Cache' },
            { step: '04', name: 'Indexed MySQL 8.0', desc: 'B-Tree composite indexing & optimized query execution', tech: 'MySQL 8.0' },
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

    // Helper: Determine archetype from project ID
    const getProjectArchetype = (projectId) => {
        switch (projectId) {
            case 'restaurant-rec':
            case 'rag-product-search':
                return 'vector-rag';
            case 'pimmz-club':
                return 'cluster-concurrency';
            case 'air-writing':
            case 'emotion-detection':
                return 'computer-vision-cnn';
            case 'e-bidding':
            case 'amc-training':
                return 'state-machine-vault';
            case 'procurement-strategy':
            case 'pea-hackathon':
            default:
                return 'dual-engine-forecast';
        }
    };

    const archetype = getProjectArchetype(project.id);

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

        // --- 2. Color Palette & Materials ---
        const primaryColor = isEnterprise ? 0x06b6d4 : 0xa855f7;
        const accentColor = isEnterprise ? 0x38bdf8 : 0xec4899;
        const glowColor = isEnterprise ? 0xa5f3fc : 0xfbcfe8;

        // --- 3. Lights ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
        scene.add(ambientLight);

        const pLight = new THREE.PointLight(primaryColor, 4.5, 25);
        pLight.position.set(2, 4, 4);
        scene.add(pLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight.position.set(-3, 3, 3);
        scene.add(fillLight);

        // Master group containing all 3D architectural nodes
        const masterGroup = new THREE.Group();
        scene.add(masterGroup);

        const nodeCount = 5;
        const spacing = 1.08;
        const startX = -((nodeCount - 1) * spacing) / 2;
        const nodePositions = [];
        const nodeMeshes = [];
        const disposables = [];

        // Helper to create glass material for a node
        const createNodeMaterial = (isActive) => {
            return new THREE.MeshPhongMaterial({
                color: isActive ? accentColor : primaryColor,
                emissive: isActive ? accentColor : primaryColor,
                emissiveIntensity: isActive ? 0.9 : 0.3,
                transparent: true,
                opacity: 0.88,
                shininess: 95
            });
        };

        // Helper to add wireframe to any geometry
        const addWireframe = (parentMesh, geometry, wireColor = glowColor) => {
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMat = new THREE.LineBasicMaterial({
                color: wireColor,
                transparent: true,
                opacity: 0.55
            });
            const wire = new THREE.LineSegments(edges, edgeMat);
            parentMesh.add(wire);
            disposables.push(edges, edgeMat);
        };

        // Build distinct node geometries depending on the Archetype
        for (let i = 0; i < nodeCount; i++) {
            const x = startX + i * spacing;
            const y = Math.sin((i / (nodeCount - 1)) * Math.PI) * 0.28 - 0.05;
            const z = (i % 2 === 1 ? -0.15 : 0.15);
            const nodePos = new THREE.Vector3(x, y, z);
            nodePositions.push(nodePos);

            const nodeGroup = new THREE.Group();
            nodeGroup.position.copy(nodePos);
            const isActive = i === activeStageIndex;
            const mat = createNodeMaterial(isActive);
            disposables.push(mat);

            // ARCHETYPE 1: Vector Space & Semantic RAG (restaurant-rec, rag-product-search)
            if (archetype === 'vector-rag') {
                if (i === 0) {
                    // Natural Query: Faceted Diamond
                    const geo = new THREE.OctahedronGeometry(0.32);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 1) {
                    // Dense Embedding: High-dimensional Vector Cluster with orbiting points
                    const geo = new THREE.IcosahedronGeometry(0.3, 0);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    // Orbiting cluster points
                    for (let p = 0; p < 6; p++) {
                        const ptGeo = new THREE.SphereGeometry(0.04, 6, 6);
                        const ptMat = new THREE.MeshBasicMaterial({ color: glowColor });
                        const ptMesh = new THREE.Mesh(ptGeo, ptMat);
                        const angle = (p / 6) * Math.PI * 2;
                        ptMesh.position.set(Math.cos(angle) * 0.42, Math.sin(angle) * 0.42, 0);
                        nodeGroup.add(ptMesh);
                        disposables.push(ptGeo, ptMat);
                    }
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 2) {
                    // pgvector Semantic Store: Vector Index Cylinder with distance torus ring
                    const geo = new THREE.CylinderGeometry(0.34, 0.34, 0.42, 16);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    const ringGeo = new THREE.TorusGeometry(0.5, 0.02, 8, 24);
                    const ringMat = new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.7 });
                    const ring = new THREE.Mesh(ringGeo, ringMat);
                    ring.rotation.x = Math.PI / 2.5;
                    nodeGroup.add(ring);
                    nodeGroup.add(mesh);
                    disposables.push(geo, ringGeo, ringMat);
                } else if (i === 3) {
                    // Cold-Start Strategy / Filter Gate: Conical Filter
                    const geo = new THREE.ConeGeometry(0.32, 0.48, 6);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.rotation.x = Math.PI;
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else {
                    // LLM Reasoning / Explainability Gateway: Neural Core
                    const geo = new THREE.DodecahedronGeometry(0.34);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                }
            }
            // ARCHETYPE 2: Concurrency Cluster & Cache (pimmz-club)
            else if (archetype === 'cluster-concurrency') {
                if (i === 0) {
                    // Traffic Ingress: Gateway Hexagon
                    const geo = new THREE.CylinderGeometry(0.35, 0.35, 0.42, 6);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 1) {
                    // Node.js Multi-Core Cluster: 4 parallel worker cubes
                    const clusterGroup = new THREE.Group();
                    const wGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
                    disposables.push(wGeo);
                    const offsets = [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]];
                    offsets.forEach(([ox, oy]) => {
                        const wMesh = new THREE.Mesh(wGeo, mat);
                        wMesh.position.set(ox, oy, 0);
                        addWireframe(wMesh, wGeo);
                        clusterGroup.add(wMesh);
                    });
                    nodeGroup.add(clusterGroup);
                } else if (i === 2) {
                    // SWR In-Memory Cache: Revolving Torus Ring
                    const geo = new THREE.TorusGeometry(0.38, 0.08, 12, 32);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.rotation.x = Math.PI / 3;
                    const coreGeo = new THREE.SphereGeometry(0.18, 12, 12);
                    const coreMesh = new THREE.Mesh(coreGeo, mat);
                    nodeGroup.add(coreMesh);
                    nodeGroup.add(mesh);
                    disposables.push(geo, coreGeo);
                } else if (i === 3) {
                    // MySQL 8.0 B-Tree Disk Stack: 3 Layered Discs
                    const stackGroup = new THREE.Group();
                    const dGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 16);
                    disposables.push(dGeo);
                    [-0.15, 0, 0.15].forEach((dy) => {
                        const dMesh = new THREE.Mesh(dGeo, mat);
                        dMesh.position.y = dy;
                        addWireframe(dMesh, dGeo);
                        stackGroup.add(dMesh);
                    });
                    nodeGroup.add(stackGroup);
                } else {
                    // Smart Connect SSO: Protected Token Diamond
                    const geo = new THREE.OctahedronGeometry(0.34);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                }
            }
            // ARCHETYPE 3: Computer Vision & CNN (air-writing, emotion-detection)
            else if (archetype === 'computer-vision-cnn') {
                if (i === 0) {
                    // Webcam Ingress Frame: Video Grid Sensor Plane
                    const geo = new THREE.BoxGeometry(0.55, 0.4, 0.05);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 1) {
                    // Landmark / Face Bounding Mesh: 3D Tracking Lattice
                    const geo = new THREE.OctahedronGeometry(0.34, 1);
                    const wireMat = new THREE.MeshBasicMaterial({ color: glowColor, wireframe: true });
                    const mesh = new THREE.Mesh(geo, wireMat);
                    nodeGroup.add(mesh);
                    disposables.push(geo, wireMat);
                } else if (i === 2) {
                    // Conv2D Tensor Feature Map: Planar Matrix Block
                    const geo = new THREE.BoxGeometry(0.44, 0.44, 0.14);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 3) {
                    // Deep CNN Layer (VGG16 / MobileNet): Condensed Tensor
                    const geo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else {
                    // Softmax Classification Node: Neural Star
                    const geo = new THREE.IcosahedronGeometry(0.32, 0);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                }
            }
            // ARCHETYPE 4: Enterprise Vault & State Machine (e-bidding, amc-training)
            else if (archetype === 'state-machine-vault') {
                if (i === 0) {
                    // RFP & Commercial Terms: Contract Document Stack
                    const geo = new THREE.BoxGeometry(0.46, 0.36, 0.08);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 1) {
                    // Participant Portal: Hexagonal Gateway Gate
                    const geo = new THREE.CylinderGeometry(0.36, 0.36, 0.4, 6);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 2) {
                    // Sealed Envelope Vault: Cryptographic Safe with Orbiting Shield Ring
                    const geo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    const ringGeo = new THREE.TorusGeometry(0.52, 0.02, 8, 24);
                    const ringMat = new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.75 });
                    const ring = new THREE.Mesh(ringGeo, ringMat);
                    ring.rotation.x = Math.PI / 4;
                    nodeGroup.add(ring);
                    nodeGroup.add(mesh);
                    disposables.push(geo, ringGeo, ringMat);
                } else if (i === 3) {
                    // Evaluation Engine: Precision Scoring Crystal
                    const geo = new THREE.OctahedronGeometry(0.36);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else {
                    // Board Approval & Audit Sign-Off: Certified Circular Seal Pedestal
                    const geo = new THREE.CylinderGeometry(0.38, 0.38, 0.16, 20);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                }
            }
            // ARCHETYPE 5: Dual-Engine Clean Architecture & Forecasting (procurement-strategy, pea-hackathon)
            else {
                if (i === 0) {
                    // Multi-Zone Ingestion: Conical Intake
                    const geo = new THREE.ConeGeometry(0.34, 0.44, 8);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.rotation.z = -Math.PI / 2;
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 1) {
                    // High-Throughput Core (Go / Anomaly Z-Score): Clean Architecture Dual Cube
                    const geo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 2) {
                    // Kraljic Matrix / LME Markets: 4-Quadrant Coordinate Prism
                    const geo = new THREE.CylinderGeometry(0.36, 0.36, 0.36, 4);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.rotation.y = Math.PI / 4;
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                } else if (i === 3) {
                    // ARIMAX Forecasting / RAG Literature: Time-Series Wave Model
                    const geo = new THREE.TorusGeometry(0.36, 0.08, 10, 24);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.rotation.x = Math.PI / 3;
                    const coreGeo = new THREE.SphereGeometry(0.16, 12, 12);
                    const coreMesh = new THREE.Mesh(coreGeo, mat);
                    nodeGroup.add(coreMesh);
                    nodeGroup.add(mesh);
                    disposables.push(geo, coreGeo);
                } else {
                    // Buy Signal / Strategic Directives: Multi-factor Decision Beacon
                    const geo = new THREE.DodecahedronGeometry(0.35);
                    const mesh = new THREE.Mesh(geo, mat);
                    addWireframe(mesh, geo);
                    nodeGroup.add(mesh);
                    disposables.push(geo);
                }
            }

            // Signal Pulse Ring for the Active Node
            if (isActive) {
                const pulseGeo = new THREE.RingGeometry(0.45, 0.48, 24);
                const pulseMat = new THREE.MeshBasicMaterial({
                    color: glowColor,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.85
                });
                const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
                pulseMesh.rotation.x = Math.PI / 2;
                nodeGroup.add(pulseMesh);
                nodeGroup.userData.pulse = pulseMesh;
                disposables.push(pulseGeo, pulseMat);
            }

            masterGroup.add(nodeGroup);
            nodeMeshes.push(nodeGroup);
        }

        // Connecting Laser Pipeline Curves
        const curvePoints = nodePositions.map(pos => pos.clone());
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.025, 8, false);
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
        const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
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

        // --- 7. Animation Loop with Dynamic Camera Focus & Signal Pulse ---
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

            // Dynamic Camera Focus Lerp towards the active stage
            if (nodePositions[activeStageIndex]) {
                const targetCamX = nodePositions[activeStageIndex].x * 0.38;
                const targetCamY = 1.7 + nodePositions[activeStageIndex].y * 0.2;
                camera.position.x += (targetCamX - camera.position.x) * (delta * 3.2);
                camera.position.y += (targetCamY - camera.position.y) * (delta * 3.2);
                camera.lookAt(nodePositions[activeStageIndex].x * 0.2, 0, 0);
            }

            // Move data packets along the real pipeline curve
            packets.forEach((p) => {
                p.progress = (p.progress + delta * 0.35) % 1.0;
                const pos = curve.getPointAt(p.progress);
                p.mesh.position.copy(pos);
            });

            // Gentle rotation for the active node and animate signal pulses
            nodeMeshes.forEach((meshGroup, idx) => {
                meshGroup.rotation.y += delta * (idx === activeStageIndex ? 1.4 : 0.4);
                meshGroup.rotation.x += delta * (idx === activeStageIndex ? 0.3 : 0.1);

                // Animate Signal Pulse ring
                if (meshGroup.userData && meshGroup.userData.pulse) {
                    const pulseScale = 1.0 + (Math.sin(time * 4) + 1) * 0.35;
                    meshGroup.userData.pulse.scale.set(pulseScale, pulseScale, pulseScale);
                }
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
            <div className="relative z-10 flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <Workflow className="w-5 h-5 text-purple-400" />
                    <div>
                        <div className="text-sm sm:text-base font-mono font-bold tracking-wide uppercase text-white">
                            Architecture & Dataflow Pipeline
                        </div>
                        <div className="text-xs font-mono text-purple-300/90 mt-0.5">
                            {pipelineData.type}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Interactive Pipeline Canvas */}
            <div
                ref={containerRef}
                className="relative z-10 w-full h-[130px] sm:h-[150px] cursor-crosshair"
                title="Hover to tilt and inspect architectural pipeline"
            />

            {/* Vertical Flow of the 5 Project-Specific Stages (Clean, readable, 100% relevant) */}
            <div className="relative z-10 mt-3 space-y-2">
                <div className="text-xs font-mono uppercase text-gray-400 tracking-wider flex items-center justify-between px-1">
                    <span>System Execution Flow (Click to Focus)</span>
                    <span className="text-purple-400 font-semibold">Node {activeStageIndex + 1} of 5</span>
                </div>

                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-0.5">
                    {pipelineData.stages.map((stg, idx) => {
                        const isActive = idx === activeStageIndex;
                        return (
                            <div
                                key={stg.step}
                                onClick={() => setActiveStageIndex(idx)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                    isActive
                                        ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-950/30'
                                        : 'bg-black/30 hover:bg-black/50 border-white/5 hover:border-white/15'
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 border ${
                                            isActive
                                                ? 'bg-purple-500 text-white border-purple-400'
                                                : 'bg-white/5 text-purple-300 border-white/10'
                                        }`}
                                    >
                                        {stg.step}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-gray-100 truncate">
                                            {stg.name}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate mt-0.5">
                                            {stg.desc}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-purple-200 border border-white/10 flex-shrink-0">
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
