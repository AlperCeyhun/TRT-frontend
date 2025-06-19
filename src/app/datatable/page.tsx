"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoDatacardTop from "@/components/TodoDatacardTop";
import { TodoDataTable } from "@/components/TodoDataTable";
import { loadTodos } from "@/lib/todo/loadtodo";
import { Category } from "@/lib/todo/fetchtodo";

export type Todo = {
  userId: number
  id: number
  title: string
  description: string
  completed: boolean
  category: Category
}

export default function Home() {
  
  const router = useRouter();
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  
  
  const handleAddTask = (category: Category | null) => {
    if (!newTitle.trim() || !newDescription.trim() || !category) return;

    const created: Todo = {
      id: Math.floor(Math.random() * 10000),
      title: newTitle,
      completed: false,
      userId: 1,
      description: newDescription,
      category: category, // assuming backend expects this
    };

    setTodos((prev) => [created, ...prev]);
    setNewTitle("");
    setNewDescription("");
  };

  useEffect(() => {
    loadTodos(setTodos, setError, setLoading);
  }, []);

	return (
    <div className="items-center justify-items-center min-h-screen relative mt-8">
        <TodoDatacardTop
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          handleAddTask={handleAddTask}
          isTableView={true}/>
        <div className="items-center justify-items-center mt-8 min-w-[800px]">
            <TodoDataTable todos={todos}/>
        </div>
    </div>
  );
}