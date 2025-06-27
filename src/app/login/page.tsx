"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { clearLocalStorage } from "@/lib/user/clearLocalStorage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const t = useTranslations("login");

  clearLocalStorage();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {

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

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
          if (username === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/datatable");
          }
        } else {
          setErrorMessage("No token received from server.");
        }
      } else {
        let errorText = "Login failed. Check your username/password.";
        const rawText = await response.text();

        try {
          const errorData = JSON.parse(rawText);
          errorText = errorData.message || errorText;
        } catch (jsonError) {
          console.warn("Non-JSON error response:", rawText);
        }

        setErrorMessage(errorText);
      }
    } catch (error) {
      setErrorMessage("Server connection failed. Make sure the backend is running.");
    }
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          {t("title")}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">{t("username_title")}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t("username_prompt")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">{t("password_title")}</Label>
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
            {t("sign_in_title")}
          </Button>
          <p>
            {t("register_message")}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 px-2 hover:underline"
              onClick={handleRegister}
            >
              {t("sign_up_title")}
            </a>
          </p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;