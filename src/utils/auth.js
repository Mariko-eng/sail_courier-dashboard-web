// authUtils.js
const TOKEN_KEY = 'firebase_token';
const TOKEN_EXPIRY_KEY = 'firebase_token_expiry';

// Store token with expiry time
export const storeToken = (token, expiresIn = 3600) => {
  const expiryTime = Date.now() + (expiresIn * 1000) - (5 * 60 * 1000); // 5 minutes before actual expiry
  
  // console.log("token" , token)
  // console.log("expiryTime" , expiryTime.toString())
  
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

// Get stored token
export const getStoredToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!token || !expiryTime) return null;
  
  return {
    token,
    expiresAt: parseInt(expiryTime)
  };
};

// Clear stored token
export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};