"use client";

import React from "react";
import TodoTable from "@/components/TodoDatacard";
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
    <div className="items-center justify-items-center min-h-screen text-white">
      YOU SHALL NOT BE HERE
    </div>
  );
}
