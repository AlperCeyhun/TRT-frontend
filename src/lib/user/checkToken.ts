"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useCheckToken() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/unauthorized");
    }
  }, [router]);
}
