# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/42bbefce-3701-452f-8b0b-e83059d2a770

Here's a professional `README.md` file for your **JANANI** project, without any references to Lovable. It includes all standard sections for a full-stack AI-powered maternal health platform built with TypeScript, Vite, React, Tailwind CSS, shadcn-ui, and Supabase.

---

```markdown
# 🤰 JANANI – Journey of A Nurtured And Nurturing Individual

**AI-Powered Care for Every Mother**  
JANANI is a comprehensive maternal health platform that leverages AI to provide personalized, accessible, and intelligent care throughout every stage of pregnancy. From symptom tracking to ultrasound scheduling and real-time health scoring, JANANI empowers mothers with tools to manage their journey with confidence.

---

## 🚀 Live Demo

👉 [Start Your Journey](https://your-domain-here.com)

---

## 🧠 Features

- 🔍 **Smart Symptom Analyzer** – Detect and suggest insights based on reported symptoms.
- 🧮 **AI-Driven Health Scorecard** – Real-time risk analysis using key health metrics.
- 🤖 **Personalized AI Assistant** – Chatbot with tailored responses and health support.
- 👩‍⚕️ **PCOS/PCOD Tracker** – Specialized logs for hormonal condition tracking.
- 🩻 **Ultrasound Scheduler** – Schedule, track and get reminders for scans.
- 👨‍👩‍👧 **Family Member Mode** – Include partner or caregiver access for shared support.
- 🧘‍♀️ **Wellness Programs** – Suggestions for workouts, nutrition, and mindfulness.
- 🧬 **Gamification & Progress Journal** – Celebrate milestones with visual progress.
- 🔐 **Facial Login & Secure Auth** – Ensures safety and privacy of sensitive data.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui
- **State & Hooks**: React Hooks, Context API
- **Backend**: Supabase (Auth, DB, Edge Functions)
- **AI & ML**: Custom logic for Symptom Analysis & Health Score
- **Deployment**: Static Hosting (e.g., Vercel/Netlify/Render)

---

## 📂 Project Structure

```

src/
├── components/           # UI Components (Forms, Modals, Dashboard Widgets)
├── pages/                # Page Routes (Dashboard, Home, NotFound)
├── hooks/                # Custom React Hooks (useHealthScore, useProfile, etc.)
├── integrations/         # Supabase Configuration and DB Logic
├── lib/                  # Utility Functions
├── main.tsx              # App Entry Point
├── App.tsx               # Root Component

````

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or pnpm
- Supabase Project (for backend)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/janani-ai-compass.git
cd janani-ai-compass

# Install dependencies
npm install

# Start development server
npm run dev
````

---

## 🌐 Supabase Configuration

1. Create a Supabase project and copy the keys.
2. Update your `.env` file:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Deploy `supabase/functions/calculate-health-score/index.ts` as an Edge Function to dynamically compute maternal health scores.

---

## 🧪 AI Functionality

* Health Score is calculated using parameters such as BP, sugar levels, mood, activity, and symptoms via a backend Edge Function.
* Symptom Analyzer uses rule-based logic with plans to integrate LLM for deeper intent extraction.


---

## 🛡️ License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Kashvi** – [GitHub](https://github.com/Kashvi009)

---

> JANANI is not just a project. It's a commitment to empowering maternal care through technology.

