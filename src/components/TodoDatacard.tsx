import React, { useEffect, useState } from 'react';
import TodoPagination from '@/components/TodoPagination';
import TodoDatacardContext from '@/components/TodoDatacardContext';
import TodoDatacardTop from "@/components/TodoDatacardTop";
import { Todo } from '@/lib/todo/fetchtodo';
import { Category } from '@/lib/todo/fetchtodo';
import { loadTodos } from "@/lib/todo/loadtodo";
import { deleteTodo } from '@/lib/todo/deletetodo';
import { updateTodo, UpdatePayload } from "@/lib/todo/updatetodo";
import { addTask } from "@/lib/todo/addTask";
import { Assignee } from '@/components/TodoDataTable';
import { getUsers, User } from '@/lib/user/getusers';
import { postAssign } from "@/lib/assignees/postassign"; // ✅ add this
import { deleteAssign } from "@/lib/assignees/deleteAssign"; // ✅ add this

const ITEMS_PER_PAGE = 5;

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allAssignees, setAllAssignees] = useState<Assignee[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const HandleUpdate = async (id: number, updates: UpdatePayload) => {
    try {
      const oldTodo = todos.find((t) => t.id === id);
      if (!oldTodo) return;

      // 🧠 Handle assignees diff if provided
      if ('assignees' in updates) {
        const oldIds = (oldTodo.assignees ?? []).map((a) => a.userId);
        const newIds = updates.assignees?.map((a) => a.userId) ?? [];

        const added = newIds.filter((id) => !oldIds.includes(id));
        const removed = oldIds.filter((id) => !newIds.includes(id));

        // 🛠 API calls for changes
        for (const userId of added) {
          await postAssign(id, [userId]);
        }
        for (const userId of removed) {
          await deleteAssign(id, userId);
        }
      }

      await updateTodo(id, updates);

      // ✅ Update frontend state
      setTodos(todos.map((t) =>
        t.id === id ? {
          ...t,
          ...updates,
          assignees: 'assignees' in updates ? updates.assignees! : t.assignees,
        } : t
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
    loadTodos(setTodos, setError, setLoading);
  }, []);

  useEffect(() => {
    getUsers()
      .then((users: User[]) => {
        const assigneeList: Assignee[] = users.map((user) => ({
          userId: user.id,
          username: user.username,
        }));
        setAllAssignees(assigneeList);
      })
      .catch((err) => {
        console.error("Failed to fetch assignees", err);
        setError("Failed to load assignees");
      });
  }, []);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between mb-4'>
        <TodoDatacardTop
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          handleAddTask={handleAddTask}
        />
      </div>
      <div className="space-y-1">
        <TodoDatacardContext
          todos={paginatedTodos.map((t) => ({
            ...t,
            assignees: t.assignees ?? [],
          }))}
          onCheck={HandleUpdate}
          onDelete={HandleDelete}
          allAssignees={allAssignees}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <TodoPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Todos;