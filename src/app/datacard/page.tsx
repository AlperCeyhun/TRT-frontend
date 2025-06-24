"use client";

import React from "react";
import TodoDatacard from "@/components/TodoDatacard";

export default function Home() {
  
  return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
      <TodoDatacard />
    </div>
  );
}