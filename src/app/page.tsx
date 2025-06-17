"use client";
import React from "react";
import TodoTable from "@/components/TodoTable";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen bg-black font-[family-name:var(--font-geist-sans)]">
      <p className="text-amber-50 p-5">Landing page</p>
      <TodoTable/>
    </div>
  );
}
