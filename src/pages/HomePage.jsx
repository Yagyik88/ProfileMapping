// src/pages/HomePage.jsx
import React, { useState } from "react";
import ProfileList from "../components/ProfileList";
import SearchFilter from "../components/SearchFilter";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>User Profiles</h1>
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProfileList searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
