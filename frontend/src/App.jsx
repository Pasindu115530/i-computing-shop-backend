import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Admin from "./pages/adminpage";
import Register from "./pages/registerPage";
import Login from "./pages/loginpage";
import './index.css'


function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-primary text-secondary    ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
