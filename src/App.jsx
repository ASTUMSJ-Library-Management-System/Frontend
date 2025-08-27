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

import ManageBooks from "./adminpages/ManageBooks";
import ManageUsers from "./adminpages/ManageUsers";
import PaymentRequests from "./adminpages/PaymentRequests";
import BorrowingRecords from "./adminpages/BorrowingRecords";

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

      {/* Student-only protected pages */}
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
        path="/managebooks"
        element={
          <ProtectedRoute requireAdmin={true}>
            <ManageBooks />
          </ProtectedRoute>
        }
      />
      {/* Admin dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard type="admin" />
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
        path="/borrowingrecords"
        element={
          <ProtectedRoute requireAdmin={true}>
            <BorrowingRecords />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
