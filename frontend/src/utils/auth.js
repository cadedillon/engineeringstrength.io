// utils/auth.js
export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");

  console.log("The value of the token at retrieval time is: ", token);

  // You can also add extra validation if needed (e.g., check token expiration)
  return !!token; // Returns true if token exists, false otherwise
};
