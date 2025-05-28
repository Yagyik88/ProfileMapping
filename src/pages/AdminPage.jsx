import React, { useContext, useState } from "react";
import { ProfilesContext } from "../context/ProfilesContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

const AdminPage = () => {
  const { profiles, setProfiles } = useContext(ProfilesContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    profession: "",
    description: "",
    photo: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      latitude: "",
      longitude: "",
    },
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      age: "",
      profession: "",
      description: "",
      photo: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        latitude: "",
        longitude: "",
      },
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address.city) {
      alert("Name and city are required fields");
      return;
    }

    const newProfile = {
      ...formData,
      id: editingId || Date.now().toString(),
      age: Number(formData.age),
      address: {
        ...formData.address,
        latitude: Number(formData.address.latitude) || 0,
        longitude: Number(formData.address.longitude) || 0,
      },
    };

    if (editingId) {
      setProfiles(
        profiles.map((profile) =>
          profile.id === editingId ? newProfile : profile
        )
      );
    } else {
      setProfiles([...profiles, newProfile]);
    }

    resetForm();
  };

  const handleEdit = (profile) => {
    setFormData({
      ...profile,
      address: { ...profile.address },
    });
    setEditingId(profile.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles(profiles.filter((profile) => profile.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="container my-4">
      <button onClick={() => navigate("/")} className="btn btn-link mb-3">
        ← Back to Profiles
      </button>

      <h1 className="mb-4">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <h2>{editingId ? "Edit Profile" : "Add New Profile"}</h2>

        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Profession</label>
            <input
              type="text"
              name="profession"
              className="form-control"
              value={formData.profession}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Photo URL</label>
          <input
            type="text"
            name="photo"
            className="form-control"
            value={formData.photo}
            onChange={handleInputChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <h3>Address</h3>
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label">Street</label>
            <input
              type="text"
              name="street"
              className="form-control"
              value={formData.address.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">City *</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              className="form-control"
              value={formData.address.zipcode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              className="form-control"
              value={formData.address.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Latitude</label>
            <input
              type="number"
              name="latitude"
              step="any"
              className="form-control"
              value={formData.address.latitude}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Longitude</label>
            <input
              type="number"
              name="longitude"
              step="any"
              className="form-control"
              value={formData.address.longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success me-2">
          {editingId ? "Update Profile" : "Add Profile"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2 className="mb-3">Profiles ({profiles.length})</h2>

      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} style={{ minWidth: 320, maxWidth: 350 }}>
              <ProfileCard
                profile={profile}
                onDelete={handleDelete}
                onViewSummary={() =>
                  alert(profile.description || "No description available")
                }
              />
              <button
                className="btn btn-sm btn-warning mt-2 w-100"
                onClick={() => handleEdit(profile)}
              >
                Edit Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
