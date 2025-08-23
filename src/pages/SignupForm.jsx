import React from "react";
import { RegisterForm } from "../components/Login-form.jsx";

const SignupForm = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#EDFDF7]">
      <div className="bg-white w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default SignupForm;
