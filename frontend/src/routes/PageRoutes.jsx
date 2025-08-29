import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "../config/ProtectedRoute";
import Chat from "../pages/Chat";

const PageRoutes = ({user}) => {  
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route path="/auth-user" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default PageRoutes;
