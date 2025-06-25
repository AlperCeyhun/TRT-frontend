"use client";

import React from "react";
import TodoDatacard from "@/components/TodoDatacard";
import { checkToken } from "@/lib/user/checkToken";

export default function Home() {
  
  checkToken();
  return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
      <TodoDatacard />
    </div>
  );
}