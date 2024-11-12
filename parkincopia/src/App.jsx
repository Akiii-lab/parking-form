import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import  HomeAdmin  from "./pages/HomeAdmin.jsx";

function App() {
    return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Soy el Admin" element={<HomeAdmin />} />
      </Routes>
  );
}

export default App;
