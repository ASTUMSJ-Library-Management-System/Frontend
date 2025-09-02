import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this to match your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
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

// Auth API functions
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else if (error.response?.status === 404)
        throw new Error("Login endpoint not found. Please check the server.");
      else if (error.response?.status === 500)
        throw new Error("Server error. Please try again later.");
      else if (error.code === "ECONNREFUSED")
        throw new Error(
          "Cannot connect to server. Please check if the backend is running."
        );
      else throw new Error("Network error. Please check your connection.");
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else if (error.response?.status === 404)
        throw new Error(
          "Registration endpoint not found. Please check the server."
        );
      else if (error.response?.status === 500)
        throw new Error("Server error. Please try again later.");
      else if (error.code === "ECONNREFUSED")
        throw new Error(
          "Cannot connect to server. Please check if the backend is running."
        );
      else throw new Error("Network error. Please check your connection.");
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post("/auth/refresh-token", { refreshToken });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to refresh token.");
    }
  },
};

// User management
export const userAPI = {
  getProfile: async () => {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch profile.");
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put("/user/profile", userData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to update profile.");
    }
  },
};

// Book management API functions
export const bookAPI = {
  getBooks: async () => {
    try {
      const response = await api.get("/books");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch books.");
    }
  },

  addBook: async (bookData) => {
    try {
      if (bookData instanceof FormData) {
        const response = await api.post("/books", bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      }
      const response = await api.post("/books", bookData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to add book.");
    }
  },

  updateBook: async (id, bookData) => {
    try {
      if (bookData instanceof FormData) {
        const response = await api.put(`/books/${id}`, bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      }
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to update book.");
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to delete book.");
    }
  },
};

// Payment management API functions
export const paymentAPI = {
  getPayments: async () => {
    try {
      console.log("Fetching payments from:", "/payments");
      const response = await api.get("/payments");
      console.log("Payments response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Payment API Error:",
        error.response?.status,
        error.response?.data,
        error
      );
      if (error.response?.status === 404)
        throw new Error(
          "Payments endpoint not found. Please check if the backend route is configured."
        );
      if (error.response?.status === 401)
        throw new Error("Authentication failed. Please log in again.");
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch payments.");
    }
  },

  updatePaymentStatus: async (id, status) => {
    try {
      console.log("Updating payment status:", id, status);
      const response = await api.put(`/payments/${id}`, { status });
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Update Payment Status Error:",
        error.response?.status,
        error.response?.data,
        error
      );
      if (error.response?.status === 404) throw new Error("Payment not found.");
      if (error.response?.status === 401)
        throw new Error("Authentication failed. Please log in again.");
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to update payment status.");
    }
  },
};

// Borrowing management API functions
export const borrowAPI = {
  getBorrows: async () => {
    try {
      const response = await api.get("/borrow");
      return response.data;
    } catch (error) {
      console.error(
        "Borrow API Error:",
        error.response?.status,
        error.response?.data
      );
      if (error.response?.status === 404)
        throw new Error(
          "Borrows endpoint not found. You need to add a GET route in your backend."
        );
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch borrow records.");
    }
  },

  requestReturn: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/return/${borrowId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Request Return API Error:",
        error.response?.status,
        error.response?.data
      );
      if (error.response?.status === 404)
        throw new Error(
          "Return request endpoint not found. Please check if the backend route is configured."
        );
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to request return.");
    }
  },

  approveReturn: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/return/${borrowId}/approve`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to approve return.");
    }
  },

  declineReturn: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/return/${borrowId}/decline`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to decline return.");
    }
  },

  markAsReturned: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/${borrowId}/return`);
      return response.data;
    } catch (error) {
      console.error(
        "Mark As Returned API Error:",
        error.response?.status,
        error.response?.data
      );
      if (error.response?.status === 404)
        throw new Error(
          "Mark as returned endpoint not found. Please check your backend route."
        );
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to mark as returned.");
    }
  },

  getMyBorrows: async () => {
    try {
      const response = await api.get("/borrow/myBorrows");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch your borrows.");
    }
  },

  borrowBook: async (bookId) => {
    try {
      const response = await api.post(`/borrow/${bookId}`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to borrow book.");
    }
  },
};

// Student book operations
export const studentBookAPI = {
  getBooks: async () => {
    try {
      const response = await api.get("/books");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch books.");
    }
  },
};

// Student payment operations
export const studentPaymentAPI = {
  submitPayment: async (formData) => {
    try {
      const response = await api.post("/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to submit payment.");
    }
  },

  getMyPayments: async () => {
    try {
      const response = await api.get("/payments/myPayments");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch payment history.");
    }
  },

  checkPaymentStatus: async () => {
    try {
      const response = await api.get("/payments/isPaid");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to check payment status.");
    }
  },
};

export default api;
