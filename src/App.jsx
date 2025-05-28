import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProfilesProvider } from './context/ProfilesContext';
import HomePage from './pages/HomePage';
import ProfileDetailsPage from './pages/ProfileDetailsPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ProfilesProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfileDetailsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ProfilesProvider>
  );
}

export default App;