export async function getAssignedUsers(taskId: number): Promise<number[]> {
  const res = await fetch(`http://localhost:5195/api/assignees/user/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users for task with id: ${taskId}. Status: ${res.status}`);
  }

  const data = await res.json();
  return data as number[];
}