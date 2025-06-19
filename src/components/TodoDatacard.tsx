import React, { useEffect, useState } from 'react';
import TodoPagination from '@/components/TodoPagination';
import TodoDatacardContext from '@/components/TodoDatacardContext';
import TodoDatacardTop from "@/components/TodoDatacardTop";
import { Todo } from '@/lib/fetchtodo';
import { Category } from '@/lib/fetchtodo';
import { loadTodos } from "@/lib/loadtodo";
import { deleteTodo } from '@/lib/deletetodo';
import { updateTodo } from '@/lib/updatetodo';
import { posttodo } from '@/lib/posttodo';

const ITEMS_PER_PAGE = 5;

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const HandleUpdate = async (id: number) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error("Update Task failed", error);
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

  const handleAddTask = async (category: Category | null) => {
    if (!newTitle.trim() || category === null) return;
    try {
      const created = await posttodo({ title: newTitle, description: newDescription, category: category, completed: false });
      //dummy userId
      const fullTodo: Todo = {
        ...created,
        userId: 1,
        description: newDescription || "",
        category: category,
      };
      setTodos((prev) => [fullTodo, ...prev]);
      setNewTitle("");
    } catch (error) {
      setError("Failed to add task");
    }
  };


  useEffect(() => {
    loadTodos(setTodos, setError, setLoading);
  }, []);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between mb-4'>
        <TodoDatacardTop newTitle={newTitle} setNewTitle={setNewTitle} newDescription={newDescription} setNewDescription={setNewDescription} handleAddTask={handleAddTask}/>
      </div>
      <div className="space-y-1">
        <TodoDatacardContext todos={paginatedTodos} onCheck={HandleUpdate} onDelete={HandleDelete}/>
      </div>
      <div className="mt-4 flex justify-center">
        <TodoPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
};

export default Todos;