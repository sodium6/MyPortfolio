# 🚀 CV & Portfolio Projects Summary (ระบบและ Use Cases ทั้งหมด)

เอกสารรวบรวมรายละเอียดโปรเจกต์ สถาปัตยกรรมระบบ Use Cases และผลลัพธ์เชิงประสิทธิภาพ สำหรับอ้างอิงและอัปเดตลงเรซูเม่และพอร์ตโฟลิโอ

---

## 📊 Executive Overview & Key Highlights

| # | ชื่อโปรเจกต์ | ประเภท / องค์กร | Tech Stack สำคัญ | จุดเด่น & ผลลัพธ์เชิงตัวเลข (Impact / Metric) |
|---|---|---|---|---|
| **1.1** | **AI Strategic Procurement Platform** | Enterprise (Beatrix) | Next.js 14, Go 1.22, FastAPI, PostgreSQL, Supabase, RAG | Pareto ABC (80/20), Kraljic Matrix, 16-Cell Action Directives, RAG Advisor |
| **1.2** | **PEA-Hackathon (AIPP Platform)** | Enterprise / Hackathon | Next.js, NestJS, FastAPI, ARIMAX, Docker, yfinance | Anomaly Detection 14 เขต (|Z| > 2), 24-Mo ARIMAX Forecast ผูกตลาด LME, Buy-Signal 4 มิติ |
| **1.3** | **E-Bidding System** | Enterprise (Beatrix) | Next.js, NestJS, Azure AD, PostgreSQL, Playwright | มาตรฐาน **ISO/IEC 29110**, Sealed/Unsealed Envelopes, Multi-Tier Approval, Surrogate Bidding |
| **1.4** | **PImmz.Club (AMC Purchasing Club)** | Enterprise (Beatrix) | Node.js (Cluster), Express, MySQL 8.0, In-Memory Cache | **เร็วขึ้น 1,700 เท่า** (2,726.35 ms → 1.60 ms), **100% Pass Rate** ที่ 1,000 VUs (k6), ลดโหลด DB >95% |
| **1.5** | **AMC Training Center** | Enterprise (Beatrix) | React (Vite), Express.js, Bento UI, Excel Export | ระบบอบรมนิติบุคคล/บุคคล, ตรวจสลิป, ทะเบียนวิทยากร PDF, Admin Dashboard & Excel Export, PDPA |
| **2.1** | **Restaurant Recommendation System** | AI / Machine Learning | FastAPI, scikit-learn, pgvector, OpenRouter LLM, React | Hybrid Recommendation (CF + Content-Based), Precision@K / Recall@K / F1@K, Thai LLM Reasoning |
| **2.2** | **Mini Project : RAG (Product Search)** | AI / Gen-AI | Supabase, pgvector, BAAI/bge-m3, gemma3:1b (Ollama) | Hybrid Semantic Search, Local SLM (gemma3:1b), FastAPI Gateway |
| **2.3** | **Air Writing & Alphabet Recognition** | Computer Vision / DL | OpenCV, MediaPipe, CNN (VGG16, MobileNetV2) | ติดตามพิกัดมือ Real-time, ความแม่นยำจำแนกตัวอักษร **97% Accuracy** |
| **2.4** | **Emotional Face Detection** | Deep Learning / Leadership | CNN, OpenCV, Flask, Python | ผู้นำทีม Data Pipeline & Model Training, Multi-class Emotion Inference REST API |

---

## 🏢 1. Enterprise & Production Work Experience (BEATRIX CO., LTD.)

### 1.1 AI Strategic Procurement Platform
* **บทบาท (Role):** AI & Full Stack Developer
* **ช่วงเวลา:** 2025–2026
* **สถาปัตยกรรม:** Next.js 14, Go Core Engine (Clean Architecture), Python AI Engine (FastAPI), PostgreSQL / Supabase, OpenRouter / Gemini API
* **Use Cases & ฟีเจอร์หลัก:**
  - **Pareto Spend Analysis (ABC Classification):** วิเคราะห์มูลค่าการใช้จ่ายและจัดหมวดหมู่พัสดุตามกฎ 80/20 เพื่อบริหารความสำคัญ
  - **Strategic Sourcing Matrices:** คำนวณและพล็อตกราฟ Kraljic Matrix (Supply Positioning) จับคู่กับ Supplier Preferencing Matrix (Core, Develop, Exploit, Nuisance)
  - **16-Cell Action Directives & SRM Roadmap:** กำหนดแนวทางปฏิบัติเชิงกลยุทธ์ 16 ช่องทาง พร้อมจัดทำแผนผัง SRM 9-Level Transition Roadmap เพื่อยกระดับความสัมพันธ์กับซัพพลายเออร์
  - **AI Strategic Advisor (RAG Grounded on PDF Literature):** พัฒนาระบบ Retrieval-Augmented Generation ค้นคืนเนื้อหาจากตำราและเอกสารจัดซื้อเชิงกลยุทธ์สากล ช่วยตอบคำถามและให้คำแนะนำในการเจรจาต่อรอง
* **Tech Stack:** `Next.js 14`, `Go 1.22`, `Python (FastAPI)`, `PostgreSQL`, `Supabase`, `RAG`, `Kraljic Matrix`, `ABC Analysis`, `Clean Architecture`

---

### 1.2 PEA-Hackathon: AI-Powered Procurement Intelligence Platform (AIPP)
* **บทบาท (Role):** AI & Full Stack Developer
* **ช่วงเวลา:** 2026
* **สถาปัตยกรรม:** Next.js, NestJS, FastAPI (Python), PostgreSQL, Prisma, Docker
* **Use Cases & ฟีเจอร์หลัก:**
  - **Demand Anomaly Detection:** ตรวจจับความผิดปกติของแผนจัดหาพัสดุจาก 14 เขตพื้นที่ โดยใช้ Z-score (|Z| > 2) พร้อมหน้าจอ Human-in-the-loop (Human Gate) สำหรับเจ้าหน้าที่ตรวจสอบและยืนยันข้อมูล
  - **Auto-ML Price & Demand Forecasting:** เปรียบเทียบ 4 โมเดล (Linear, ARIMA, ARIMAX, Holt-Winters) เพื่อพยากรณ์ราคาล่วงหน้า 24 เดือน ผูกกับตัวแปรภายนอก (Exogenous) คือราคาตลาดโลก LME (Copper & Aluminium) ตามสัดส่วน Material Composition (TR, CB, IN, MT)
  - **Buy Signal Decision Engine:** ระบบวิเคราะห์สัญญาณการจัดซื้อ (URGENT / BUY / WAIT / MONITOR) จาก 4 ปัจจัย: ราคา (30%), ระดับสต็อก (30%), กำลังการผลิตซัพพลายเออร์ (20%), และ Deadline (20%) พร้อมฟังก์ชันสรุปภาพรวมผ่าน LLM
* **Tech Stack:** `Next.js`, `NestJS`, `FastAPI`, `Python (scikit-learn, statsmodels)`, `ARIMAX`, `PostgreSQL`, `Prisma`, `Docker`, `yfinance`

---

### 1.3 E-Bidding System
* **บทบาท (Role):** Full Stack Developer & UX/UI System Designer
* **ช่วงเวลา:** 2025–2026
* **มาตรฐานการพัฒนา:** ได้รับการรับรองตามมาตรฐาน **ISO/IEC 29110**
* **สถาปัตยกรรม:** Next.js, NestJS, TypeScript, PostgreSQL, Azure AD SSO
* **Use Cases & ฟีเจอร์หลัก:**
  - **End-to-End Bidding Lifecycle:** จัดการตั้งแต่ระดับ Sourcing Project, Event Bidding (RFP/RFQ), การสร้าง Template TOR แบบตารางราคาและเงื่อนไขเฉพาะทาง (Credit Terms, Warranty, Retention, ค่าปรับ)
  - **Sealed & Unsealed Envelope Rules:** รองรับโหมดเปิดซองและปิดซองประมูลตามระเบียบจัดซื้อ เพื่อรักษาความโปร่งใสและซ่อนราคาจนกว่าจะถึงเวลาเปิดซอง
  - **Surrogate Bidding & Participant Portal:** พอร์ทัลสำหรับ Supplier เสนอราคาและส่งเอกสาร พร้อมฟังก์ชัน Surrogate Bidding ให้เจ้าหน้าที่จัดซื้อยื่นข้อเสนอแทนในกรณีจำเป็นภายใต้การควบคุม
  - **Multi-Level Approval Workflow:** ระบบเสนอขออนุมัติผลการประมูลแบบลำดับขั้น (เลขาธิการตรวจสอบ → คณะกรรมการ Board อนุมัติ) พร้อมแนบ Memo สรุปผล
* **Tech Stack:** `Next.js`, `NestJS`, `TypeScript`, `PostgreSQL`, `Azure AD SSO`, `Playwright`, `ISO/IEC 29110`

---

### 1.4 PImmz.Club (AMC Purchasing Club)
* **บทบาท (Role):** Full Stack & Performance Optimization Engineer
* **ช่วงเวลา:** 2025–2026
* **สถาปัตยกรรม:** Node.js (Cluster Mode), Express.js, MySQL 8.0, In-Memory Caching
* **Use Cases & ฟีเจอร์หลัก:**
  - **High-Concurrency Architecture:** รองรับผู้ใช้งานพร้อมกัน 1,000–10,000 Concurrent Users ด้วย Node.js Multi-core Cluster และ Stale-While-Revalidate In-Memory Caching ลดภาระ Database ได้มากกว่า 95%
  - **Database Index Optimization:** ขจัดปัญหา N+1 Query ด้วย B-Tree Composite Indexing และ Single `LEFT JOIN`
  - **Performance Benchmark (Grafana k6):**
    - News API latency ลดลงจาก **2,726.35 ms เหลือเพียง 1.60 ms (เร็วขึ้น 1,700 เท่า)**
    - Failed Requests ที่ 1,000 VUs: **0% (100% Pass Rate)**
    - SLA ผ่านเกณฑ์ < 350 ms ทุก Endpoint
  - **Enterprise Integration:** เชื่อมต่อระบบกลาง Smart Connect Single Sign-On (SSO) และรองรับระบบสมาชิกแยกตาม Purchaser Tiers
* **Tech Stack:** `Node.js (Cluster)`, `Express.js`, `MySQL 8.0`, `In-Memory Caching`, `Grafana k6`, `GitHub Actions CI/CD`, `SSO`

---

### 1.5 AMC Training Center
* **บทบาท (Role):** Full Stack Developer & UI Designer
* **ช่วงเวลา:** 2025–2026
* **สถาปัตยกรรม:** React (Vite), Express.js, RESTful API
* **Use Cases & ฟีเจอร์หลัก:**
  - **Modern EdTech Portal:** แพลตฟอร์มศูนย์ฝึกอบรม สัมมนา และพัฒนาทักษะวิชาชีพออนไลน์ ออกแบบ UI สไตล์ Skooldio / Bento Grid
  - **Corporate & Individual Registration:** แบบฟอร์มลงทะเบียนแยกตามนิติบุคคล (พร้อมข้อมูลผู้ประสานงาน/ผู้เข้าอบรม) และบุคคลธรรมดา รองรับการแนบสลิปชำระเงิน และระบบยินยอม PDPA
  - **Knowledge & Lecturer Hub:** ทำเนียบวิทยากรพร้อมเรซูเม่ PDF, คลังบทความวิชาการ, ตลาดซื้อ-ขายแลกเปลี่ยน (Community Forum)
  - **Admin Back-Office Dashboard:** แผงควบคุมสรุป KPI จัดการคอร์สสาธารณะและ In-House, จัดการบทความ, ตรวจสอบหลักฐานการชำระเงิน และ Export ข้อมูลผู้เข้าอบรมเป็นไฟล์ Excel (.xlsx)
* **Tech Stack:** `React (Vite)`, `Node.js (Express)`, `Modern UI/UX (Bento Grid, Frosted Glass)`, `Excel Export`, `PDPA`

---

## 🧠 2. AI, Machine Learning & Deep Learning Projects

### 2.1 Restaurant Recommendation & Reservation System
* **บทบาท (Role):** Machine Learning & Full Stack Developer
* **ช่วงเวลา:** 2025–2026
* **สถาปัตยกรรม:** Monorepo (React Vite + Node.js Express + Python FastAPI)
* **Use Cases & ฟีเจอร์หลัก:**
  - **Machine Learning Recommendation Engine:**
    - พัฒนาและเปรียบเทียบโมเดล: User-Based Collaborative Filtering (Cosine Similarity), Content-Based Filtering (Embeddings & Cuisine One-Hot) และ **Hybrid Weighted Blend Model**
    - ประเมินความแม่นยำด้วยตัววัดสถิติ: Precision@K, Recall@K, และ F1@K พร้อม Fallback Chain ไปสู่ Popularity Model เมื่อเจอ Cold-Start
  - **Vector Search & AI Explainability:** ใช้ PostgreSQL + `pgvector` ในการค้นหาร้านที่คล้ายกัน พร้อมเชื่อมต่อ OpenRouter LLM เพื่อสร้างคำอธิบายเหตุผลภาษาไทยว่า "ทำไมถึงแนะนำร้านนี้" และผู้ช่วยแชทค้นหาร้านอาหาร
* **Tech Stack:** `FastAPI`, `Python (scikit-learn, pandas)`, `PostgreSQL`, `pgvector`, `OpenRouter LLM`, `React (Vite)`, `Express.js`

---

### 2.2 Mini Project : RAG (AI Product Search System)
* **บทบาท (Role):** AI / RAG Developer
* **ช่วงเวลา:** 2025
* **Use Cases & ฟีเจอร์หลัก:**
  - พัฒนาระบบค้นหาสินค้าอัจฉริยะแบบ Hybrid Search ด้วย Supabase (PostgreSQL / `pgvector`)
  - ใช้โมเดล `BAAI/bge-m3` ในการทำ Vector Embedding และโมเดลภาษาขนาดเล็ก `gemma3:1b` (Ollama) เพื่อตีความคำค้นหาและสรุปข้อมูล
  - เชื่อมต่อผ่าน FastAPI REST API ประสิทธิภาพสูงสำหรับการประมวลผลความหน่วงต่ำ
* **Tech Stack:** `RAG`, `Supabase`, `pgvector`, `BAAI/bge-m3`, `gemma3:1b (Ollama)`, `FastAPI`, `Python`

---

### 2.3 Air Writing & Alphabet Recognition
* **บทบาท (Role):** Computer Vision & Deep Learning Engineer
* **ช่วงเวลา:** 2024–2025
* **Use Cases & ฟีเจอร์หลัก:**
  - พัฒนาระบบตรวจจับการวาดตัวอักษรกลางอากาศแบบ Real-time ด้วย OpenCV และ MediaPipe
  - เทรนและเปรียบเทียบโครงข่ายประสาทเทียม CNN (VGG16 และ MobileNetV2) ได้ผลความแม่นยำ **97% Accuracy** ในการจำแนกตัวอักษรลายมือเขียน
* **Tech Stack:** `CNN`, `VGG16`, `MobileNetV2`, `OpenCV`, `MediaPipe`, `Deep Learning`, `Python`

---

### 2.4 Emotional Face Detection
* **บทบาท (Role):** Team Lead & Deep Learning Engineer
* **ช่วงเวลา:** 2023
* **Use Cases & ฟีเจอร์หลัก:**
  - จัดการและนำทีมรวบรวม Data Preprocessing สำหรับชุดข้อมูลใบหน้าและอารมณ์
  - เทรนและ Fine-tune โมเดล Deep Learning จำแนกอารมณ์หลายคลาส พร้อมพัฒนา Backend ด้วย Flask สำหรับ Real-time Image Inference
* **Tech Stack:** `Deep Learning`, `Flask`, `Team Leadership`, `OpenCV`, `CNN`, `Python`
