"use client";

import React from "react";
import TodoDatacard from "@/components/TodoDatacard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

export default function Home() {
  
  const router = useRouter();
  
  const handleBack = () => {
    router.push("/");
  };
  
  return (
    <div className="items-center justify-items-center min-h-screen relative">
      <Button variant={"outline"} className="absolute top-4 left-4" onClick={handleBack}>
        <ArrowBigLeft className="mr-2" />
  	    Back to Home
      </Button>
      <p className="text-amber-50 p-5">Datacard Page</p>
      <TodoDatacard />
    </div>
  );
}