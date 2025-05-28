import { useState } from 'react';
import ProfileList from '../components/ProfileList';
import SearchFilter from '../components/SearchFilter';
import '../styles/component-styles.css';

const HomePage = ({ profiles, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <SearchFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      <ProfileList profiles={filteredProfiles} onDelete={onDelete} />
    </div>
  );
};

export default HomePage;