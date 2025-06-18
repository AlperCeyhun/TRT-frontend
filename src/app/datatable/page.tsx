"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import TodoDatacardTop from "@/components/TodoDatacardTop";
import { TodoDataTable } from "@/components/TodoDataTable";
import { loadTodos } from "@/lib/todo/loadtodo";

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  
  const router = useRouter();
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      // Simulate a fake created task with a unique ID
      const created: Todo = {
        id: Math.floor(Math.random() * 10000), // dummy ID
        title: newTask,
        completed: false,
        userId: 1, // dummy userId
      };

      setTodos((prev) => [created, ...prev]);
      setNewTask("");
    } catch (error) {
      setError("Failed to add task (dummy mode)");
    }
  };

  
  const handleBack = () => {
    router.push("/home");
  };
  
  useEffect(() => {
    loadTodos(setTodos, setError, setLoading);
  }, []);

	return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
        <Button variant={"outline"} className="absolute top-4 left-4" onClick={handleBack}>
            <ArrowBigLeft className="mr-2" />
            Back to Home
        </Button>
        <TodoDatacardTop newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />
        <div className="items-center justify-items-center mt-8 min-w-[800px]">
            <TodoDataTable todos={todos} />
        </div>
    </div>
  );
}