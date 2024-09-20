import React, { useState } from "react";

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
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
