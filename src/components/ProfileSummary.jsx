import MapComponent from './MapComponent';
import '../styles/component-styles.css';

const ProfileSummary = ({ profile, onBack }) => {
  return (
    <div className="profile-summary-container">
      <div className="profile-summary-info">
        <button onClick={onBack} className="back-btn">← Back</button>
        <img src={profile.photo} alt={profile.name} className="summary-img" />
        <h2>{profile.name}</h2>
        <p><strong>Profession:</strong> {profile.profession}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>Description:</strong> {profile.description || "No additional details provided."}</p>
      </div>
      <div className="profile-summary-map">
        <MapComponent location={profile.location} />
      </div>
    </div>
  );
};

export default ProfileSummary;
