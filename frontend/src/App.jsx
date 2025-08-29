import React from "react";
import AuthPage from "./pages/AuthPage";
import PageRoutes from "./routes/PageRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const App = () => {
  
  return (
    <div>
      <PageRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
