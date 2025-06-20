export async function deleteAssign() {
  const res = await fetch(`http://localhost:5195/api/todo-tasks/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete todo with ID`);
  }
  
  return true;
}
//check this later