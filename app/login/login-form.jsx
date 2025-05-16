"use client";
import { useState } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

//client componet
export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR);
  const validateForm = ({ email, password }) => {
    if (email === "") {
      setError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "password is required",
      });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        error: true,
        message: "Email is invalid,",
      });
      return false;
    }
    setError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Validate ", validateForm({ email, password }));

    if (validateForm({ email, password })) {
      await signIn.email(
        { email, password },
        {
          onSuccess: () => {
            // redirect to dashobard
            setLoading(false);
            redirect("/admin");
          },
          onError: (ctx) => {
            setError({
              error: true,
              message: ctx.error.message,
            });
            // loading false
          },
        }
      );
    }
    setTimeout(() => console.log("Error :", error), 1000);
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login To Your account</CardTitle>
          <CardDescription>Enter Your Email to below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3 ">
                <Label htmlform="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  // type="email"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlform="email">Password</Label>
                  <Link
                    href="forget password "
                    className="inline-block ml-auto underline-offset-4 hover:underline"
                  >
                    Forget Your password
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
                />
              </div>
              {/* Error message here */}
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-xs text-center text-red-600 duration-700 animate-pulse">
                    {error.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loade2 className="animate-spin" />} Log In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Log In With Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
