"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      console.log("Trying to login with username:", username);

      const response = await fetch("http://localhost:5195/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, data:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Token stored in localStorage:", data.token);
          if (data.isAdmin) {
            router.push("/datacard");
          } else {
            router.push("/datatable");
          }
        } else {
          setErrorMessage("No token received from server.");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Check your username/password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Server connection failed. Make sure the backend is running.");
    }
  };


  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/register");
    console.log("Redirecting to register page");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          TODO
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="useranme">useranme</Label>
            <Input
              id="useranme"
              type="useranme"
              placeholder="useranme"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p>Dont have an account?
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 px-2 hover:underline" onClick={handleRegister}>Sign up</a>
          </p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;