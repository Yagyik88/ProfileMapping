import React, { useContext, useState } from "react";
import { ProfilesContext } from "../context/ProfilesContext";

const AdminPanel = () => {
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
    <div className="container my-5" style={{ maxWidth: 700 }}>
      <h1 className="mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="form-control mb-3"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <input
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <input
          name="imageUrl"
          placeholder="Photo URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary me-2">
          {editingId ? "Update" : "Add"} Profile
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </form>

      <h2 className="mb-3">Existing Profiles</h2>
      {profiles.length === 0 && <p>No profiles available.</p>}
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="card mb-3 d-flex flex-row justify-content-between align-items-center p-3"
        >
          <div>
            <strong>{profile.name}</strong>
          </div>
          <div>
            <button
              onClick={() => handleEdit(profile)}
              className="btn btn-sm btn-warning me-2"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(profile.id)} className="btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
