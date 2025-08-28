import { Routes, Route, Navigate } from "react-router-dom";
import MembershipPayment from "./pages/MembershipPayment";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import BrowseBooks from "./pages/BrowseBooks";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import ManageBooks from "./adminpages/ManageBooks";
import ManageUsers from "./adminpages/ManageUsers";
import PaymentRequests from "./adminpages/PaymentRequests";
import BorrowingRecord from "./adminpages/BorrowingRecord";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student-only routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin={false}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/membershippayment"
        element={
          <ProtectedRoute>
            <MembershipPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mybooks"
        element={
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browsebooks"
        element={
          <ProtectedRoute>
            <BrowseBooks />
          </ProtectedRoute>
        }
      />

      {/* Admin-only routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard type="admin" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/managebooks"
        element={
          <ProtectedRoute requireAdmin={true}>
            <ManageBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageusers"
        element={
          <ProtectedRoute requireAdmin={true}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/paymentrequests"
        element={
          <ProtectedRoute requireAdmin={true}>
            <PaymentRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrowingrecord"
        element={
          <ProtectedRoute requireAdmin={true}>
            <BorrowingRecord />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
