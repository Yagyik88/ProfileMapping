import { useState } from 'react';
import MapComponent from './MapComponent';
import '../styles/component-styles.css';

const ProfileCard = ({ profile, onDelete }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} className="profile-img" />
      <div className="profile-info">
        <h3>{profile.name}</h3>
        <p>{profile.profession}</p>
        <p>{profile.city}</p>
      </div>
      <div className="profile-actions">
        <button 
          onClick={() => setShowMap(!showMap)}
          className="map-btn"
        >
          {showMap ? "Hide Map" : "View Location"}
        </button>
        <button 
          onClick={() => onDelete(profile.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
      {showMap && <MapComponent location={profile.location} />}
    </div>
  );
};

export default ProfileCard;