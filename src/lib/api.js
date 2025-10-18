import axios from "axios";

// Use an environment variable for the API base URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-m3la.onrender.com/api";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create separate axios instance for FormData requests
const apiFormData = axios.create({
  baseURL: API_BASE_URL,
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

// ================= API HELPERS =================
/**
 * A centralized error handler for API calls.
 * @param {Error} error - The error object from axios.
 * @param {string} [context='operation'] - A string describing the context of the API call.
 * @returns {Error} A new Error with a user-friendly message.
 */
const handleApiError = (error, context = 'operation') => {
  if (error.response?.data?.message) {
    return new Error(error.response.data.message);
  }
  if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
    return new Error('Cannot connect to the server. Please check your network connection and ensure the backend is running.');
  }
  if (error.response?.status) {
    return new Error(`A server error occurred (status ${error.response.status}) during the ${context}.`);
  }
  return new Error(`An unexpected error occurred during the ${context}.`);
};

// ================= AUTH API =================
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'login');
    }
  },

  register: async (userData) => {
    try {
      // Use FormData instance for FormData requests, regular instance for JSON
      const client = userData instanceof FormData ? apiFormData : api;
      const response = await client.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'registration');
    }
  },

  logout: async () => {
    // This function handles client-side logout logic.
    // It's designed to be called from the useAuth hook.
    console.log("Redirecting to home and then clearing user session.");

    // 1. Redirect first to prevent other components from making API calls
    //    after the token is removed, which would trigger the 401 interceptor.
    window.location.href = "/";

    // 2. Clear the session data from local storage after the redirect has been initiated.
    localStorage.clear(); // Clear all items for a clean logout
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post("/auth/refresh-token", { refreshToken });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'token refresh');
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
      throw handleApiError(error, 'fetching profile');
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put("/user/profile", userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'updating profile');
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
      throw handleApiError(error, 'fetching books');
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
      throw handleApiError(error, 'adding book');
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
      throw handleApiError(error, 'updating book');
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'deleting book');
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
      throw handleApiError(error, 'fetching payments');
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
      throw handleApiError(error, 'updating payment status');
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
      throw handleApiError(error, 'fetching borrow records');
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
      throw handleApiError(error, 'requesting return');
    }
  },

  approveReturn: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/return/${borrowId}/approve`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'approving return');
    }
  },

  declineReturn: async (borrowId) => {
    try {
      const response = await api.put(`/borrow/return/${borrowId}/decline`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'declining return');
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
      throw handleApiError(error, 'marking book as returned');
    }
  },

  getMyBorrows: async () => {
    try {
      const response = await api.get("/borrow/myBorrows");
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'fetching your borrows');
    }
  },

  borrowBook: async (bookId) => {
    try {
      const response = await api.post(`/borrow/${bookId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'borrowing book');
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
      throw handleApiError(error, 'fetching books');
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
      throw handleApiError(error, 'submitting payment');
    }
  },

  getMyPayments: async () => {
    try {
      const response = await api.get("/payments/myPayments");
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'fetching payment history');
    }
  },

  checkPaymentStatus: async () => {
    try {
      const response = await api.get("/payments/isPaid");
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'checking payment status');
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
      throw handleApiError(error, 'saving review');
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
      throw handleApiError(error, 'fetching book reviews');
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
      throw handleApiError(error, 'fetching user review');
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
      throw handleApiError(error, 'fetching your reviews');
    }
  },

  // Get book review statistics
  getBookReviewStats: async (bookId) => {
    try {
      const response = await api.get(`/reviews/book/${bookId}/stats`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'fetching review statistics');
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
      throw handleApiError(error, 'updating review');
    }
  },

  // Delete a specific review
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'deleting review');
    }
  },
};

export default api;
