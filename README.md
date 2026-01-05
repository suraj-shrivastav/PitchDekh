# PitchDekh: The Ultimate Startup-VC Bridge

PitchDekh is an AI-first platform designed to revolutionize the way startups interact with Venture Capitalists. By combining the power of Large Language Models (LLMs) with specialized web crawling and search APIs, PitchDekh provides an end-to-end ecosystem for pitch analysis, market research, and intelligent investor matching.

---

## Screenshots

### Hero Page
![Hero Page Placeholder](./frontend/public/hero.png)
*The stunning landing page featuring the 'Modern Midnight' aesthetic, glassmorphism, and entry points for startups and admins.*

### AI Pitch Analysis
![Analysis Placeholder](./frontend/public/pitchDetailed.png)
*Deep dive into your pitch deck. AI extracts everything from your vision and business model to roadmap and team background.*

### Market Research
![Research Placeholder](./frontend/public/marketResearch.png)
*Real-time market insights powered by Tavily and Firecrawl, providing a competitive edge for your fundraising journey.*

### VC Profiles
![VC Profiles Placeholder](./frontend/public/vcProfiles.png)
*Automated extraction of VC investment thesis, portfolio companies, and focus areas using advanced web scraping.*

### Match Pitch-VC
![Match Placeholder](./frontend/public/matchVC.png)
*Intelligent scoring and matching between your startup's profile and VC investment criteria.*
---

## Key Features

### For Startups
- **AI-Driven Pitch Parsing**: Upload your PDF pitch deck and let Google Gemini extract and normalize every critical detail.
- **Traction & Growth Tracking**: Automatically capture revenue data, growth rates, and user base metrics directly from your deck.
- **Strategic Roadmap Visualization**: See your short-term and mid-term goals mapped out by AI.
- **Risk Assessment**: Identify potential hurdles and areas of concern before presenting to investors.

### For Investors & Matchmaking
- **Smart VC Matching**: Based on your stage, industry, and HQ, find VCs that are the perfect fit for your startup.
- **VC Profile Extraction**: Paste a VC's website link, and our Firecrawl engine scrapes their investment thesis, portfolio, and focus areas.
- **Advanced Normalization**: All pitch data is normalized into a strictly structured format for consistent comparison and analysis.

### Universal Features
- **Modern UI/UX**: Built with a "Modern Midnight" theme, utilizing glassmorphism, gradients, and micro-animations for a premium feel.
- **Seamless Auth**: Fast and secure authentication powered by Supabase.
- **Cloud Storage**: Pitch decks are securely stored in Supabase Storage buckets.

---

## Technical Workflows

### Pitch Parse Flow
The journey from a raw PDF to structured startup intelligence.

![Pitch Parse Flow Placeholder](./frontend/public/parse_flow.jpg)

### VC Extract Flow
A multi-stage pipeline for automated investor research and profile enrichment.

![VC Extract Flow Placeholder](./frontend/public/extract_flow.jpg)

---

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: React Context API
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Navigation**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Aesthetics**: Custom Glassmorphism UI, Modern Midnight Color Palette

### Backend
- **Server**: [Node.js](https://nodejs.org/) + [Express.js 5](https://expressjs.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Object Storage**: [Supabase Storage](https://supabase.com/storage)
- **AI Engine**: [Google Gemini](https://ai.google.dev/)
- **Web Crawling**: [Firecrawl](https://firecrawl.dev/)
- **Search API**: [Tavily](https://tavily.com/)

---

## Project Structure

```bash
PitchDeckMatcher/
├── frontend/               # React application
│   ├── src/
│   │   ├── context/        # Auth and Upload contexts
│   │   ├── pages/          # UI pages (Hero, MyPitch, VCProfile, etc.)
│   │   ├── libs/           # Supabase client
│   │   └── App.jsx         # Main router and entry point
│   └── tailwind.config.js
├── backend/                # Express server
│   ├── src/
│   │   ├── controller/     # Route handlers logic
│   │   ├── libs/           # Gemini, Firecrawl, and Tavily integrations
│   │   ├── middleware/     # Auth and Upload middlewares
│   │   ├── routes/         # Express API routes
│   │   └── database/       # Supabase client and insert functions
│   └── package.json
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- A Supabase project
- Google Gemini API Key
- Firecrawl API Key
- Tavily API Key

### 1. Clone the repository
```bash
git clone https://github.com/suraj-shrivastav/PitchDekh.git
cd PitchDekh
```

### 2. Configure Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_API_KEY=your_gemini_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 3. Configure Frontend
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Application
Start the Backend (from `backend/` folder):
```bash
npm start
```
Start the Frontend (from `frontend/` folder):
```bash
npm run dev
```

---

## Authors
- **Suraj Shrivastav** - [GitHub](https://github.com/suraj-shrivastav)

---

*Built with ❤️ for the Startup Ecosystem.*

---

### Special Thanks
A huge shoutout to the AI co-founders who did 90% of the work while I took 100% of the credit:
- **Google Gemini**: For parsing pitch decks and only hallucinating on its lunch breaks.
- **ChatGPT**: For writing the boilerplate and CSS I was too lazy to type.

*No LLMs were harmed in the making of this project, though several million tokens were sacrificed to the debugging gods.*
