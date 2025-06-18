"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import TodoDatacardTop from "@/components/TodoDatacardTop";

export default function Home() {
  
  const router = useRouter();
  const [newTask, setNewTask] = React.useState<string>("");
  
  const handleAddTask = () => {
    //some logic here
  }
  
  const handleBack = () => {
    router.push("/home");
  };
  
	return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
        <Button variant={"outline"} className="absolute top-4 left-4" onClick={handleBack}>
            <ArrowBigLeft className="mr-2" />
            Back to Home
        </Button>
        <TodoDatacardTop newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />
    </div>
  );
}