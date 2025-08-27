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

import BorrowingRecord from "./adminpages/BorrowingRecord";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />

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

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard />
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
