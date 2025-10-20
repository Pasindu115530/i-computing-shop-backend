import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Admin from "./pages/adminpage";
import Register from "./pages/registerPage";
import Login from "./pages/loginpage";
import './App.css'
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>  
      <div className="w-screen h-screen bg-primary text-secondary    ">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin/*" element={<Admin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
