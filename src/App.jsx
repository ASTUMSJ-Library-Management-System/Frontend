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

export default function App() {
  return (
    <Routes>
      {/* Default route → Login Page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route path="/membershippayment" element={
        <ProtectedRoute>
          <MembershipPayment />
        </ProtectedRoute>
      } />
      <Route path="/mybooks" element={
        <ProtectedRoute>
          <MyBooks />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/browsebooks" element={
        <ProtectedRoute>
          <BrowseBooks />
        </ProtectedRoute>
      } />
      
      {/* Dashboard - accessible to all registered users */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* 404 Not Found - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
