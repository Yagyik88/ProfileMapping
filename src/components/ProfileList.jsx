import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles, onDelete }) => {
  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProfileList;