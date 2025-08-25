import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MembershipPayment from "./pages/MembershipPayment";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Browsebook from "./pages/Browsebook";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/MembershipPayment" element={<MembershipPayment />} />
      <Route path="/MyBooks" element={<MyBooks />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Browsebook" element={<Browsebook />} />
      <Route path="/Dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
