import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileSummary from '../components/ProfileSummary';

const HomePage = ({ profiles, onDelete }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="home-page">
      {selectedProfile ? (
        <ProfileSummary
          profile={selectedProfile}
          onBack={() => setSelectedProfile(null)}
        />
      ) : (
        <div className="profile-list grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onDelete={onDelete}
              onViewSummary={setSelectedProfile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
