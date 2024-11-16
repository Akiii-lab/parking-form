import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import  HomeAdmin  from "./pages/HomeAdmin.jsx";
import Admin from "./pages/Admin.jsx";
import Users from "./pages/components/Users.jsx";

function App() {
    return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
      </Routes>
  );
}

export default App;
