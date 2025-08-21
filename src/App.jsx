import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home and Signup */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect everything else */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
