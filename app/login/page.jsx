import React from "react";
import { LoginForm } from "./login-form";

//Server client
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
