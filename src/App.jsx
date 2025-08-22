import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MembershipPayment from "./pages/MembershipPayment";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Borrowbook from "./pages/Borrowbook";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Member routes */}
        <Route path="/MembershipPayment" element={<MembershipPayment />} />
        <Route path="/MyBooks" element={<MyBooks />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Borrowbook" element={<Borrowbook />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
