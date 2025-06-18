export async function deleteTodo(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete todo with ID ${id}`);
  }
  
  return true;
}
