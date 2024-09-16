import { createContext, useContext, useState } from "react";

// Create the context
const UserProfileContext = createContext();

// Custom hook to use the UserProfileContext
export const useUserProfile = () => useContext(UserProfileContext);

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
