# PitchDekh

PitchDekh is an intelligent platform designed to bridge the gap between startups and Venture Capitalists (VCs). By leveraging advanced AI technologies, it analyzes pitch decks, matches them with suitable investors, and provides deep market research insights.

## Features

- **AI-Powered Pitch Analysis**: meaningful insights and feedback on your pitch decks using Google's Gemini models.
- **Smart VC Matching**: Automatically find VCs that align with your startup's industry, stage, and funding requirements.
- **Market Research**: detailed market analysis and competitor research using Tavily and Firecrawl.
- **VC Profiles**: Detailed profiles of VCs including their investment thesis and past portfolio.
- **Secure Authentication**: User management and authentication powered by Supabase.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **AI & Data**:
    - [Google Gemini](https://ai.google.dev/) (Generative AI)
    - [Firecrawl](https://firecrawl.dev/) (Web Scraping)
    - [Tavily](https://tavily.com/) (Search API)

## Installation

Prerequisites: Node.js (v18+ recommended) and npm installed.

### 1. Clone the Repository
```bash
git clone https://github.com/suraj-shrivastav/PitchDekh.git
cd PitchDekh
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your API keys (refer to `config` or code for required keys, e.g., `PORT`, `SUPABASE_URL`, `GEMINI_API_KEY`, etc.).

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:8000` (default).

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.
