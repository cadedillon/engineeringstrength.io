// utils/auth.js
export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");

  // You can also add extra validation if needed (e.g., check token expiration)
  return !!token; // Returns true if token exists, false otherwise
};
