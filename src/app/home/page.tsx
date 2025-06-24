"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleDataCard = () => {
    router.push("/datacard");
  };

  const handleDataTable = () => {
    router.push("/datatable");
  };

  return (
    <div className="items-center justify-items-center min-h-screen">
      <p className="text-amber-50 p-5">Landing page</p>
      <div className="space-x-4">
        <Button onClick={handleDataCard}>Todo list with data card</Button>
        <Button onClick={handleDataTable}>Todo List with data table</Button>
      </div>
    </div>
  );
}