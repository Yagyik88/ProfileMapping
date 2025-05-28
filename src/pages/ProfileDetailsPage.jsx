import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfilesContext } from '../context/ProfilesContext';
import MapComponent from '../components/MapComponent';
import './ProfileDetailsPage.css';

const ProfileDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles } = useContext(ProfilesContext);

  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="not-found">
        <h2>Profile Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }
  <MapComponent 
  latitude={profile.address.latitude}
  longitude={profile.address.longitude}
  address={`${profile.address.street}, ${profile.address.city}`}
/>

  return (
    <div className="profile-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Profiles
      </button>

      <div className="profile-header">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="profile-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p className="profession">{profile.profession}</p>
          <p className="location">
            {profile.address.city}, {profile.address.country}
          </p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-about">
          <h2>About</h2>
          <p>{profile.description}</p>

          <h2>Details</h2>
          <div className="details-grid">
            <div>
              <strong>Age:</strong> {profile.age}
            </div>
            <div>
              <strong>Address:</strong> {profile.address.street}, {profile.address.city}
            </div>
          </div>
        </div>

        <div className="profile-map">
          <h2>Location</h2>
          <MapComponent
            latitude={profile.address.latitude}
            longitude={profile.address.longitude}
            address={`${profile.address.street}, ${profile.address.city}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;