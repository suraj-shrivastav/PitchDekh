import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import Navbar from "./pages/Navbar";
import MyPitches from "./pages/MyPitch";
import PitchAnalysis from "./pages/PitchAnalysis";
import VCProfile from "./pages/VCProfile";
import HeroPage from "./pages/HeroPage";
import AllVCs from "./pages/AllVCs";
import ProfilePage from "./pages/ProfilePage";
import MarketResearch from "./pages/MarketResearch";
import MatchesPage from "./pages/matches/MatchesPage";

const ProtectedRoute = ({ children }) => {
  const { user, session } = useAuth();
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    // console.log(session);
  }, [session])
  return children;
};

const App = () => {
  const { user } = useAuth();
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <div>
              <HeroPage />
            </div>
          }
        />
        <Route
          path="/pitches"
          element={
            <ProtectedRoute>
              <MyPitches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pitches/:id"
          element={
            <ProtectedRoute>
              <PitchAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pitches/:id/matches"
          element={
            <ProtectedRoute>
              <MatchesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pitches/:id/research"
          element={
            <ProtectedRoute>
              <MarketResearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vcs"
          element={
            <ProtectedRoute>
              <AllVCs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vc/:id"
          element={
            <ProtectedRoute>
              <VCProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>

  );
};

export default App;