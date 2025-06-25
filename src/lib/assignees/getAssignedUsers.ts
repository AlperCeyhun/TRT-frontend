export async function getAssignedUsers(taskId: number): Promise<number[]> {
  const res = await fetch(`http://localhost:5195/api/assignees/task/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users for task with id: ${taskId}. Status: ${res.status}`);
  }

  const data = await res.json();
  return data as number[];
}