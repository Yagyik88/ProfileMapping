import React, { useContext, useState } from "react";
import { ProfilesContext } from "../context/ProfilesContext";
import ProfileCard from "./ProfileCard";
import MapComponent from "./MapComponent";
import LoadingSpinner from "./LoadingSpinner";
// import "./ProfileList.css";

const ProfileList = () => {
  const { profiles, selectedProfile, setSelectedProfile, isLoading } =
    useContext(ProfilesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.profession.toLowerCase().includes(searchLower) ||
      profile.address.city.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, profession, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="content-wrapper">
        <div className="profiles-grid">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummaryClick={setSelectedProfile}
              />
            ))
          ) : (
            <div className="no-results">No profiles found matching your search.</div>
          )}
        </div>

        <div className="map-section">
          {selectedProfile ? (
            <>
              <h3>{selectedProfile.name}'s Location</h3>
              <MapComponent
                latitude={selectedProfile.address.latitude}
                longitude={selectedProfile.address.longitude}
                address={`${selectedProfile.address.street}, ${selectedProfile.address.city}, ${selectedProfile.address.state} ${selectedProfile.address.zipcode}`}
              />
            </>
          ) : (
            <div className="map-placeholder">
              Select a profile to view their location on the map
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileList;