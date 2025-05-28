import { useState } from 'react';
import MapComponent from './MapComponent';

const ProfileCard = ({ profile, onDelete, onViewSummary }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="img-fluid rounded-start"
            onError={e => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text mb-1"><strong>Profession:</strong> {profile.profession}</p>
            <p className="card-text mb-3"><strong>City:</strong> {profile.city}</p>
            <div className="d-flex flex-wrap gap-2">
              <button 
                className="btn btn-outline-primary"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Map" : "View Location"}
              </button>
              <button 
                className="btn btn-outline-danger"
                onClick={() => onDelete(profile.id)}
              >
                Delete
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => onViewSummary(profile)}
              >
                View Summary
              </button>
            </div>
            {showMap && (
              <div className="mt-3" style={{ minHeight: '200px' }}>
                <MapComponent location={profile.location} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
