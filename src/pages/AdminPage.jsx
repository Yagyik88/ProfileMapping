// import React, { useContext, useState } from "react";
// import { ProfilesContext } from "../context/ProfilesContext";
// import { useNavigate } from "react-router-dom";
// // import "./AdminPage.css";

// const AdminPage = () => {
//   const { profiles, setProfiles } = useContext(ProfilesContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     age: "",
//     profession: "",
//     description: "",
//     photo: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zipcode: "",
//       country: "",
//       latitude: "",
//       longitude: "",
//     },
//   });
//   const [editingId, setEditingId] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.address) {
//       setFormData({
//         ...formData,
//         address: { ...formData.address, [name]: value },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       id: "",
//       name: "",
//       age: "",
//       profession: "",
//       description: "",
//       photo: "",
//       address: {
//         street: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: "",
//         latitude: "",
//         longitude: "",
//       },
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.address.city) {
//       alert("Name and city are required fields");
//       return;
//     }

//     const newProfile = {
//       ...formData,
//       id: editingId || Date.now().toString(),
//       age: Number(formData.age),
//       address: {
//         ...formData.address,
//         latitude: Number(formData.address.latitude) || 0,
//         longitude: Number(formData.address.longitude) || 0,
//       },
//     };

//     if (editingId) {
//       setProfiles(
//         profiles.map((profile) =>
//           profile.id === editingId ? newProfile : profile
//         )
//       );
//     } else {
//       setProfiles([...profiles, newProfile]);
//     }

//     resetForm();
//   };

//   const handleEdit = (profile) => {
//     setFormData({
//       ...profile,
//       address: { ...profile.address },
//     });
//     setEditingId(profile.id);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this profile?")) {
//       setProfiles(profiles.filter((profile) => profile.id !== id));
//       if (editingId === id) resetForm();
//     }
//   };

//   return (
//     <div className="admin-container">
//       <button onClick={() => navigate("/")} className="back-button">
//         ← Back to Profiles
//       </button>

//       <h1>Admin Dashboard</h1>

//       <form onSubmit={handleSubmit} className="profile-form">
//         <h2>{editingId ? "Edit Profile" : "Add New Profile"}</h2>

//         <div className="form-group">
//           <label>Name *</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>Age</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Profession</label>
//             <input
//               type="text"
//               name="profession"
//               value={formData.profession}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Photo URL</label>
//           <input
//             type="text"
//             name="photo"
//             value={formData.photo}
//             onChange={handleInputChange}
//             placeholder="https://example.com/photo.jpg"
//           />
//         </div>

//         <h3>Address Information</h3>
//         <div className="form-group">
//           <label>Street</label>
//           <input
//             type="text"
//             name="street"
//             value={formData.address.street}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>City *</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.address.city}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>State</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.address.state}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>Zipcode</label>
//             <input
//               type="text"
//               name="zipcode"
//               value={formData.address.zipcode}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.address.country}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>Latitude</label>
//             <input
//               type="number"
//               step="any"
//               name="latitude"
//               value={formData.address.latitude}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Longitude</label>
//             <input
//               type="number"
//               step="any"
//               name="longitude"
//               value={formData.address.longitude}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="submit" className="submit-button">
//             {editingId ? "Update Profile" : "Add Profile"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="cancel-button"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       <div className="profiles-list">
//         <h2>Existing Profiles ({profiles.length})</h2>
//         {profiles.length === 0 ? (
//           <p>No profiles available.</p>
//         ) : (
//           <ul>
//             {profiles.map((profile) => (
//               <li key={profile.id} className="profile-item">
//                 <div className="profile-info">
//                   <img
//                     src={profile.photo || "https://via.placeholder.com/50"}
//                     alt={profile.name}
//                   />
//                   <span>{profile.name}</span>
//                 </div>
//                 <div className="profile-actions">
//                   <button
//                     onClick={() => handleEdit(profile)}
//                     className="edit-button"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(profile.id)}
//                     className="delete-button"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import { useState } from 'react';
import '../styles/component-styles.css';

const AdminPage = ({ onAddProfile }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    profession: '',
    city: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProfile({
      ...newProfile,
      photo: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? 'men' : 'women'
      }/${Math.floor(Math.random() * 100)}.jpg`,
      location: {
        lat: 40.7128 + (Math.random() * 2 - 1),
        lng: -74.0060 + (Math.random() * 2 - 1)
      }
    });
    setNewProfile({ name: '', profession: '', city: '', address: '' });
  };

  return (
    <div className="admin-panel">
      <h2>Add New Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
          required
        />
        <input
          name="profession"
          placeholder="Profession"
          value={newProfile.profession}
          onChange={(e) => setNewProfile({...newProfile, profession: e.target.value})}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={newProfile.city}
          onChange={(e) => setNewProfile({...newProfile, city: e.target.value})}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={newProfile.address}
          onChange={(e) => setNewProfile({...newProfile, address: e.target.value})}
          required
        />
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};

export default AdminPage;