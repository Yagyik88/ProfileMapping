// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage.jsx";
import NotFoundPage from "../pages/NotFoundPage";
import ProfileDetailPage from "../pages/ProfileDetailsPage.jsx";
import AdminPanel from "../pages/AdminPage.jsx";
// src/routes/AppRoutes.jsx

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/profile/:id" element={<ProfileDetailPage />} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
