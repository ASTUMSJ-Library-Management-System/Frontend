// src/lib/api.js
import axios from "axios";

// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ================= AUTH API =================
export const authAPI = {
  login: async (credentials) =>
    (await api.post("/auth/login", credentials)).data,
  register: async (userData) =>
    (await api.post("/auth/register", userData)).data,
  refreshToken: async (refreshToken) =>
    (await api.post("/auth/refresh-token", { refreshToken })).data,
};

// ================= USER API =================
export const userAPI = {
  getProfile: async () => (await api.get("/user/profile")).data,
  updateProfile: async (userData) =>
    (await api.put("/user/profile", userData)).data,
};

// ================= BOOK API =================
export const bookAPI = {
  getBooks: async () => (await api.get("/books")).data,
  addBook: async (bookData) => {
    if (bookData instanceof FormData) {
      return (
        await api.post("/books", bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    }
    return (await api.post("/books", bookData)).data;
  },
  updateBook: async (id, bookData) => {
    if (bookData instanceof FormData) {
      return (
        await api.put(`/books/${id}`, bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    }
    return (await api.put(`/books/${id}`, bookData)).data;
  },
  deleteBook: async (id) => (await api.delete(`/books/${id}`)).data,
};

// ================= PAYMENT API =================
export const paymentAPI = {
  getPayments: async () => (await api.get("/payments")).data,
  updatePaymentStatus: async (id, status) =>
    (await api.put(`/payments/${id}`, { status })).data,
};

// ================= BORROW API =================
export const borrowAPI = {
  getBorrows: async () => (await api.get("/borrow")).data,
  requestReturn: async (borrowId) =>
    (await api.put(`/borrow/return/${borrowId}`)).data,
  approveReturn: async (borrowId) =>
    (await api.put(`/borrow/return/${borrowId}/approve`)).data,
  declineReturn: async (borrowId) =>
    (await api.put(`/borrow/return/${borrowId}/decline`)).data,
  markAsReturned: async (borrowId) =>
    (await api.put(`/borrow/${borrowId}/return`)).data,
  getMyBorrows: async () => (await api.get("/borrow/myBorrows")).data,
  borrowBook: async (bookId) => (await api.post(`/borrow/${bookId}`)).data,
};

// ================= STUDENT BOOK API =================
export const studentBookAPI = {
  getBooks: async () => (await api.get("/books")).data,
};

// ================= STUDENT PAYMENT API =================
export const studentPaymentAPI = {
  submitPayment: async (formData) =>
    (
      await api.post("/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  getMyPayments: async () => (await api.get("/payments/myPayments")).data,
  checkPaymentStatus: async () => (await api.get("/payments/isPaid")).data,
};

//
// ================= REVIEW API =================
export const reviewAPI = {
  getReviews: async (bookId) =>
    (await api.get(`/reviews/${bookId}/reviews`)).data,
  addRating: async (bookId, value) =>
    (await api.post(`/reviews/${bookId}/rating`, { value })).data,
  removeRating: async (bookId) =>
    (await api.delete(`/reviews/${bookId}/rating`)).data,
  addComment: async (bookId, text) =>
    (await api.post(`/reviews/${bookId}/comment`, { text })).data,
  editComment: async (bookId, commentId, text) =>
    (await api.put(`/reviews/${bookId}/comment/${commentId}`, { text })).data,
  deleteComment: async (bookId, commentId) =>
    (await api.delete(`/reviews/${bookId}/comment/${commentId}`)).data,
};


export default api;
