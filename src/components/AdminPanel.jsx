import React, { useContext, useState } from "react";
import { ProfilesContext } from "../context/ProfilesContext";

const AdminPage = () => {
  const { profiles, setProfiles } = useContext(ProfilesContext);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    profession: "",
    city: "",
    description: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      age: "",
      profession: "",
      city: "",
      description: "",
      imageUrl: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Name is required");
      return;
    }

    const newProfile = {
      id: editingId ? editingId : Date.now().toString(),
      name: formData.name,
      age: Number(formData.age),
      profession: formData.profession,
      description: formData.description,
      photo: formData.imageUrl || "https://via.placeholder.com/150",
      address: {
        street: formData.city,
        city: formData.city,
        state: "",
        zipcode: "",
        latitude: 0,
        longitude: 0,
        country: "",
      },
    };

    if (editingId) {
      const updated = profiles.map((p) => (p.id === editingId ? newProfile : p));
      setProfiles(updated);
    } else {
      setProfiles([...profiles, newProfile]);
    }

    resetForm();
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFormData({
      id: profile.id,
      name: profile.name,
      age: profile.age,
      profession: profile.profession,
      city: profile.address.city,
      description: profile.description,
      imageUrl: profile.photo,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      const updated = profiles.filter((p) => p.id !== id);
      setProfiles(updated);
      if (editingId === id) resetForm();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <input
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleInputChange}
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <input
          name="imageUrl"
          placeholder="Photo URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ display: "block", marginBottom: 8, width: "100%", padding: 8 }}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Profile</button>
        {editingId && <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>Cancel</button>}
      </form>

      <h2>Existing Profiles</h2>
      {profiles.length === 0 && <p>No profiles available.</p>}
      {profiles.map((profile) => (
        <div
          key={profile.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{profile.name}</span>
          <div>
            <button onClick={() => handleEdit(profile)} style={{ marginRight: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
