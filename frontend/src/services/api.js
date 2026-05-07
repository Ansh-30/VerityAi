import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-l4f5.onrender.com/api",
});

// ✅ AUTH
export const authService = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
};

// ✅ NEWS
export const newsService = {
  predict: (data) => API.post("/news/predict", data),
  getHistory: () => API.get("/news/history"),
};

// ✅ REVIEWS (optional but safe)
export const reviewService = {
  submit: (data) => API.post("/reviews", data),
  getAll: () => API.get("/reviews"),
};

// ✅ ERROR HANDLER
export const extractError = (error) => {
  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
};