import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import AuthImages from "../components/AuthImages";

const AuthPage = () => {
  const [authType, setauthType] = useState("login");
  return (
    <div className="min-h-screen flex">
      <AuthImages />
      {authType === "signup" ? (
        <Signup type={authType} setType={setauthType} />
      ) : (
        <Login type={authType} setType={setauthType} />
      )}
    </div>
  );
};

export default AuthPage;
