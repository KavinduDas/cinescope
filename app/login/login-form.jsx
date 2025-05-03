"use client";
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

//client componet
export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login To Your account</CardTitle>
          <CardDescription>Enter Your Email to below</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3 ">
                <Label htmlform="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
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
                />
              </div>
              {/* Error message here */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Log In
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Log In With Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
