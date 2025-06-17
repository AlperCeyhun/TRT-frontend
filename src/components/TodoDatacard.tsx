import React, { useEffect, useState } from 'react';
import TodoPagination from '@/components/TodoPagination';
import TodoDatacardContext from '@/components/TodoDatacardContext';
import { Todo } from '@/lib/fetchtodo';
import { loadTodos } from "@/lib/loadtodo";
import { deleteTodo } from '@/lib/deletetodo';
import { updateTodo } from '@/lib/updatetodo';

const ITEMS_PER_PAGE = 6;

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const HandleCheck = async (id: number) => {
    try {
      await updateTodo(id, { completed: true});
      setTodos(todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      ));
    } catch (error) {
      console.error("Delete Task failed", error);
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Delete Task failed", error);
    }
  };

  useEffect(() => {
    loadTodos(setTodos, setError, setLoading);
  }, []);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <p className="text-gray-500">Loading your quests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-4 text-white">📝To-do List</h2>
      <ul className="space-y-1">
        <TodoDatacardContext todos={paginatedTodos} onCheck={HandleCheck} onDelete={HandleDelete}/>
      </ul>
      <div className="mt-4 flex justify-center">
        <TodoPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
};

export default Todos;