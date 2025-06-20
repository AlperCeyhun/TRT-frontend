export async function posttodo(newTodo: { title: string; completed?: boolean }) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newTodo,
      userId: 1, // JSONPlaceholder expects a userId
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add todo");
  }

  const data = await res.json();

  // The mock server will return the new object with an ID
  return {
    id: data.id, // fake ID generated by JSONPlaceholder
    title: newTodo.title,
    completed: newTodo.completed ?? false,
  };
}
