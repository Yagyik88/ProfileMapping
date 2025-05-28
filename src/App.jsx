import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProfilesContext } from "./context/ProfilesContext";
import { profiles as initialProfiles } from "./data/profiles";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "./styles/App.css";

function App() {
  const [allProfiles, setAllProfiles] = useState(initialProfiles);

  return (
    <ProfilesContext.Provider value={{ profiles: allProfiles, setProfiles: setAllProfiles }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </ProfilesContext.Provider>
  );
}

const HomeWrapper = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { profiles, setProfiles } = React.useContext(ProfilesContext);

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <>
      <button
        onClick={() => {
          if (isAdmin) {
            setIsAdmin(false);
            navigate("/");
          } else {
            setIsAdmin(true);
            navigate("/admin");
          }
        }}
        className="admin-toggle"
      >
        {isAdmin ? "Exit Admin" : "Admin Mode"}
      </button>

      <HomePage profiles={profiles} onDelete={handleDelete} />
    </>
  );
};

export default App;
