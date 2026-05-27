# Ve Tan Boon — Personal Website Direction Brief

---

## Identity

**Name / Brand**: Ve Tan Boon
**Logo**: Pixel-art wordmark "Ve Tan Boon" (existing asset, dark teal on transparent bg)
/Users/vebkks/Documents/ve-perspective/materials/Ve-Tan-Boon.png

> สองร่างที่อยู่ในคนเดียวกัน — ชีวิตส่วนตัวและชีวิตงาน

---

## Core Concept

เว็บนี้ไม่ใช่ portfolio ทั่วไป แต่เป็น **personal space** ที่ถ่ายทอดความเป็น Ve ออกมาผ่าน 3 มุมมอง:

| Section | คำ | ความหมาย |
|---|---|---|
| 1 | **Perspective** | มุมมองที่มีต่อโลกและชีวิตที่ผ่านมา |
| 2 | **Creative** | สิ่งที่สร้างสรรค์และเก็บสะสมมา |
| 3 | **Reflective** | สิ่งที่ทำแล้วอยากสะท้อนให้คนอื่นเรียนรู้ |

---

## Visual Direction

**Style**: Soft Organic
**โทนสี**: Warm cream — สะอาด สบายตา ไม่จัดจ้าน

| Token | Value |
|---|---|
| Background | `#FAF8F4` |
| Surface | `#F0E9DE` |
| Muted | `#D4C9B8` |
| Mid | `#8C7B68` |
| Ink | `#2a2a2a` |

**Typography**:
- Heading: *Cormorant Garamond* — serif italic, บางเบา, poetic
- Body: *Jost* — geometric แต่อ่อนโยน
- **Perspective section**: *Handwriting font* — เหมือนเขียนโน้ตด้วยมือ, feel บันทึกส่วนตัว

**Aesthetic keywords**: editorial · warm · personal · intimate · unhurried

---

## Page Structure

### Hero (full screen)
- Ve อยู่ตรงกลาง — รูปจริง
- ซ้าย: **Lover** — ชีวิตส่วนตัว, warm
- ขวา: **Solver** — ชีวิตงาน, cool/clean
- Visual split สองข้างยังต้องออกแบบเพิ่มเติม
- Scroll hint ด้านล่าง

### Navigation
- Logo (pixel wordmark) มุมซ้าย
- Links: Perspective · Creative · Reflective
- Social footer: Facebook · Instagram · GitHub (ไม่มี About page)

---

## Sections

### 1. Perspective

**Concept**: กระดาษแผ่นยาวของชีวิต — horizontal scroll timeline

- **Layout**: Horizontal scroll — ปัจจุบันอยู่ขวาสุด เลื่อนซ้ายไปเรื่อยๆ ยิ่งซ้ายยิ่งเก่า
- **จุดสิ้นสุดซ้าย**: วันเกิดของ Ve
- **จุดสิ้นสุดขวา**: ปัจจุบัน — update ได้เรื่อยๆ ไม่มีที่สิ้นสุด
- **กระดาษ**: แผ่นเดียว ยาวต่อเนื่อง — BG ยังไม่ตัดสินใจ (เลือกทีหลัง)
- **รูปภาพ**: transparent — blend เข้ากับ bg อย่างต่อเนื่อง
- **Typography**: Handwriting font — feel บันทึกโน้ตด้วยมือ
- **UI**: plain ที่สุด — ไม่มี element เกินจำเป็น
- **Interaction**: scroll mouse ซ้าย/ขวา = เดินทางในเวลา

### 2. Creative

ผลงานและสิ่งที่สะสม รวมถึง:
- Archive ของ moments และ milestones

### 3. Reflective

สื่อการสอนและความรู้ที่อยากส่งต่อ:
- YouTube lectures
- Slides / resources
- สำหรับนักศึกษาและคนที่สนใจงานวิจัย

---

## Tech Stack

| Layer | Tool | เหตุผล |
|---|---|---|
| Framework | Next.js 14 | Fast, SEO-friendly, App Router |
| Styling | Tailwind CSS | Cream theme, pixel-perfect |
| Animation | GSAP | Horizontal scroll, text reveal, page transitions |
| 3D / FX | Three.js / R3F | Hero scene หรือ logo animation เฉพาะจุด |
| Map | Mapbox GL JS | Fooder — custom style, hover popup |
| Database | Supabase | Posts, photos, map pins |
| CMS | Payload CMS | Admin panel — เพิ่มเนื้อหาโดยไม่แก้ code |
| Deploy | Vercel | Git push → live, global CDN |

---

## Admin Panel (Payload CMS)

Ve สามารถจัดการเนื้อหาเองได้ทั้งหมดโดยไม่ต้องแตะ code:

- [ ] เพิ่มเรื่องราวใหม่ใน Perspective (text + รูป transparent)
- [ ] อัพโหลดงานใน Creative
- [ ] เพิ่ม pin ใน Fooder map (พร้อมรูปและรีวิว)
- [ ] อัพโหลด lecture / slide ใน Reflective

---

## Out of Scope

- ไม่มี About page (แนะนำตัวผ่าน Hero และ social links)
- ไม่มี blog comment system
- ไม่มี dark mode (ใช้ cream theme เดียว)

---

## Pending Decisions

- [ ] BG texture / color ของกระดาษใน Perspective
- [ ] Visual split design ของ Hero — Lover vs Solver
- [ ] Handwriting font ที่จะใช้ (Google Fonts หรือ custom)
- [ ] Wireframe Creative และ Reflective section

---

## Next Steps

1. [ ] Wireframe Perspective — horizontal scroll timeline
2. [ ] ออกแบบ Hero visual split — Lover vs Solver
3. [ ] เลือกรูป Ve สำหรับ Hero
4. [ ] Wireframe Creative และ Reflective
5. [ ] Scaffold Next.js + Tailwind + Payload CMS
6. [ ] Deploy skeleton ขึ้น Vercel

---

*Last updated: May 2026 — Ve Tan Boon*
