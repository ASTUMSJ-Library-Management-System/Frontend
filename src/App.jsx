import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
// import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
