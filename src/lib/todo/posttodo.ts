import { Category } from "@/lib/todo/fetchtodo";

export async function posttodo(newTodo: { title: string; description: string; category: Category; completed?: boolean }) {
  const res = await fetch("http://localhost:5195/api/todo-tasks", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.token,
    },
    body: JSON.stringify({
      ...newTodo,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add todo");
  }

  const data = await res.json();

  return {
    id: data.id,
    title: newTodo.title,
    description: newTodo.description,
    completed: newTodo.completed ?? false,
  };
}