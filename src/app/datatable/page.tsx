"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoDatacardTop from "@/components/TodoDatacardTop";
import { Assignee, TodoDataTable } from "@/components/TodoDataTable";
import { loadTodos } from "@/lib/todo/loadtodo";
import { Category } from "@/lib/todo/fetchtodo";
import { addTask } from "@/lib/todo/addTask";
import TodoPagination from "@/components/TodoPagination";

export type Todo = {
  userId: number
  id: number
  title: string
  description: string
  completed: boolean
  category: Category
  assigned: Assignee[]
}

const ITEMS_PER_PAGE = 10;


export default function Home() {
  
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);

  
  const handleAddTask = (category: Category | null) => {
    addTask({
      newTitle,
      newDescription,
      category,
      setTodos,
      setNewTitle,
      setError,
    });
  };

  useEffect(() => {
    loadTodos(setTodos, setError, setLoading, setTotalCount, setCurrentPage, setPageSize, currentPage, pageSize);
  }, [currentPage]);

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
        <div className="mt-4 flex justify-center">
        <TodoPagination
          currentPage={currentPage}
          totalPages={totalCount}
          setCurrentPage={setCurrentPage}
        />
        </div>
    </div>
  );
}