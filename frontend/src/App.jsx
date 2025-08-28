import React from "react";
import AuthPage from "./pages/AuthPage";
import PageRoutes from "./routes/PageRoutes";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div>
      <PageRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
