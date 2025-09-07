import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this to match your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Create separate axios instance for FormData requests
const apiFormData = axios.create({
  baseURL: "http://localhost:5000/api",
  // No default Content-Type header - let browser set it for FormData
});

// Request interceptor to add auth token
const addAuthToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
apiFormData.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

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

// ================= AUTH API =================
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
      // Use FormData instance for FormData requests, regular instance for JSON
      const client = userData instanceof FormData ? apiFormData : api;
      const response = await client.post("/auth/register", userData);
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

// ================= USER API =================
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

// ================= BOOK API =================
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

// ================= PAYMENT API =================
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

// ================= BORROW API =================
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

// ================= STUDENT BOOK API =================
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

// ================= STUDENT PAYMENT API =================
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

// ================= REVIEW API =================
export const reviewAPI = {
  // Create or update a review
  createOrUpdateReview: async (bookId, rating, comment) => {
    try {
      const response = await api.post("/reviews", {
        bookId,
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to save review.");
    }
  },

  // Get all reviews for a specific book
  getBookReviews: async (bookId, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
    try {
      const response = await api.get(`/reviews/book/${bookId}`, {
        params: { page, limit, sortBy, sortOrder },
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch book reviews.");
    }
  },

  // Get user's review for a specific book
  getUserReview: async (bookId) => {
    try {
      const response = await api.get(`/reviews/book/${bookId}/user`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // User hasn't reviewed this book yet
      }
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch user review.");
    }
  },

  // Get all reviews by the authenticated user
  getUserReviews: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/reviews/user", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch user reviews.");
    }
  },

  // Get book review statistics
  getBookReviewStats: async (bookId) => {
    try {
      const response = await api.get(`/reviews/book/${bookId}/stats`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to fetch review statistics.");
    }
  },

  // Update a specific review
  updateReview: async (reviewId, rating, comment) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to update review.");
    }
  },

  // Delete a specific review
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
      else throw new Error("Failed to delete review.");
    }
  },
};

export default api;
