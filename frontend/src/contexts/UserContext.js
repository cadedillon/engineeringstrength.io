import React, { useEffect, useState } from "react";

// Create the context
export const UserProfileContext = React.createContext();

// Provider component
export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  // Function to update the profile
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem("userProfile", JSON.stringify(newProfile)); // Save profile to localStorage
  };

  // Load profile from localStorage when the app initializes
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile)); // Load the profile from localStorage if available
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
