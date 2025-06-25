"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function UnauthorizedPage() {
  const router = useRouter();
  const t = useTranslations("unauthorized");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <h1 className="text-5xl font-extrabold mb-4">{t("title")}</h1>
      <p className="mb-8 text-lg max-w-md text-center text-gray-300">
        {t("description")}
      </p>
      <Button onClick={() => router.push("/login")}>{t("button_label")}</Button>
    </div>
  );
}
