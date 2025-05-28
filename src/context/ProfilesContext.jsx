import React, { createContext, useState } from "react";

export const ProfilesContext = createContext();

export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      age: 28,
      profession: "Software Engineer",
      description: "A passionate developer from New York.",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        latitude: 40.7128,
        longitude: -74.006,
        country: "USA",
      },
    },
    {
      id: "2",
      name: "Bob Smith",
      age: 34,
      profession: "UX Designer",
      description: "Design enthusiast from San Francisco.",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      address: {
        street: "456 Market St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94111",
        latitude: 37.7749,
        longitude: -122.4194,
        country: "USA",
      },
    },
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        setProfiles,
        selectedProfile,
        setSelectedProfile,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};