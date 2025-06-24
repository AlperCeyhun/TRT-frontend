"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { postRegister } from "@/lib/user/postregister";
import { toast } from "sonner";
import {useTranslations} from 'next-intl';


const registerSchema = yup.object({
  username: yup.string().required("Username is required").min(3, "Too short"),
  password: yup.string().required("Password is required").min(6, "Too weak"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const t = useTranslations('register');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setServerError("");
      const { username, password } = data;
      const response = await postRegister({ username, password });

      toast.success("🎉 Registration successful!", {
        description: `Welcome aboard, ${username}!`,
      });

      router.push("/datatable");
    } catch (err: any) {
      console.error("Registration error:", err);
      setServerError("Registration failed.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          {t('title')}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="username">{t('username_title')}</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder={t('username_prompt')}
              className="mt-1"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">{t('password_title')}</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder={t('password_prompt')}
              className="mt-1"/>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t('confirm_password_title')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder={t('confirm_password_prompt')}
              className="mt-1"/>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-600 mt-2 text-center">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : t('sign_up_title')}
          </Button>

          <p className="text-sm text-center">
            {t('login_message')}
            <a
              href="#"
              onClick={handleLoginRedirect}
              className="font-medium text-indigo-600 hover:text-indigo-500 px-2 hover:underline">
              {t('sign_in_title')}
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
}