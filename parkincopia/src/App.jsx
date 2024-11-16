import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import  HomeAdmin  from "./pages/HomeAdmin.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
    return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/admin" element={<Admin />} />
      </Routes>
  );
}

export default App;
