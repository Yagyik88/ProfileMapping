import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="profile-card">
      <Link to={`/profile/${profile.id}`} className="profile-link">
        <img
          src={profile.photo}
          alt={profile.name}
          className="profile-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <div className="profile-info">
          <h3 className="profile-name">{profile.name}</h3>
          <p className="profile-profession">{profile.profession}</p>
          <p className="profile-location">
            {profile.address.city}, {profile.address.country}
          </p>
        </div>
      </Link>
      <button
        className="summary-button"
        onClick={(e) => {
          e.preventDefault();
          onSummaryClick(profile);
        }}
      >
        View on Map
      </button>
    </div>
  );
};

export default ProfileCard;