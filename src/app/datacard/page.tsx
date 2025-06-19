"use client";

import React from "react";
import TodoDatacard from "@/components/TodoDatacard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

export default function Home() {
  
  const router = useRouter();
  
  const handleBack = () => {
    router.push("/home");
  };
  
  return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
      <TodoDatacard />
    </div>
  );
}