import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MyPage from "./pages/MyPage";
import EditProfilePage from "./pages/EditProfilePage";
import MyPostsPage from "./pages/MyPostsPage";
import MyCommentsPage from "./pages/MyCommentsPage";
import FavoritesPage from "./pages/FavoritesPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import BuildingsPage from "./pages/BuildingsPage";
import BoardPage from "./pages/BoardPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import MapPage from "./pages/MapPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/my-comments" element={<MyCommentsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/buildings" element={<BuildingsPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;