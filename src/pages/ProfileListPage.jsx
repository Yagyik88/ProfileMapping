import React, { useContext, useState } from "react";
import { ProfilesContext } from "../context/ProfilesContext";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const ProfileListPage = () => {
  const { profiles, selectedProfile, setSelectedProfile } = useContext(ProfilesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Profiles</h1>

      <input
        type="text"
        placeholder="Search by name, profession or city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />

      {filteredProfiles.map((profile) => (
        <div
          key={profile.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 12,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${profile.id}`)}>
            <img
              src={profile.photo}
              alt={profile.name}
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
            />
            <strong>{profile.name}</strong> - {profile.profession}
            <p style={{ margin: 0 }}>{profile.description}</p>
          </div>

          <button onClick={() => handleSummaryClick(profile)}>Summary</button>
        </div>
      ))}

      {selectedProfile && (
        <div style={{ marginTop: 20 }}>
          <h2>Map Summary: {selectedProfile.name}</h2>
          <MapComponent
            latitude={selectedProfile.address.latitude}
            longitude={selectedProfile.address.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileListPage;
