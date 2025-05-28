import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfilesContext } from "../context/ProfilesContext";

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles } = useContext(ProfilesContext);

  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return <div style={{ padding: 20, textAlign: "center" }}>Profile not found.</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </button>
      <img
        src={profile.photo}
        alt={profile.name}
        style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", marginBottom: 20 }}
      />
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <ul>
        <li><b>Age:</b> {profile.age}</li>
        <li><b>Profession:</b> {profile.profession}</li>
        <li><b>City:</b> {profile.address.city}</li>
        <li><b>Street:</b> {profile.address.street}</li>
        <li><b>State:</b> {profile.address.state}</li>
        <li><b>Zipcode:</b> {profile.address.zipcode}</li>
        <li><b>Country:</b> {profile.address.country}</li>
      </ul>
    </div>
  );
};

export default ProfileDetail;
