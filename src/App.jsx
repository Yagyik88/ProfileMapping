import { useState } from 'react';
import { profiles as initialProfiles } from './data/profiles';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import './styles/App.css';

function App() {
  const [allProfiles, setAllProfiles] = useState(initialProfiles);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin functions
  const addProfile = (newProfile) => {
    const id = allProfiles.length + 1;
    setAllProfiles([...allProfiles, { ...newProfile, id }]);
  };

  const deleteProfile = (id) => {
    setAllProfiles(allProfiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="app">
      <button 
        onClick={() => setIsAdmin(!isAdmin)} 
        className="admin-toggle"
      >
        {isAdmin ? "Exit Admin" : "Admin Mode"}
      </button>
      
      {isAdmin ? (
        <AdminPage onAddProfile={addProfile} />
      ) : (
        <HomePage profiles={allProfiles} onDelete={deleteProfile} />
      )}
    </div>
  );
}

export default App;