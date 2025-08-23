import { Routes, Route, Navigate } from "react-router-dom";
import MembershipPayment from "./pages/MembershipPayment";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Borrowbook from "./pages/Borrowbook";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      {/* Default route → Login Page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Member routes */}
      <Route path="/membership-payment" element={<MembershipPayment />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/borrowbook" element={<Borrowbook />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
