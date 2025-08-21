import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MembershipPayment from "./pages/MembershipPayment";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Borrowbook from "./pages/Borrowbook";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
// import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/MembershipPayment" element={<MembershipPayment />} />
      <Route path="/MyBooks" element={<MyBooks />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Borrowbook" element={<Borrowbook />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<Login />} />*/}
    </Routes>
  );
}

export default App;
