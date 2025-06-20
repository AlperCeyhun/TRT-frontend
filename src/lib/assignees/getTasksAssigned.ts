export async function getTasksAssigned(userId: number): Promise<number[]> {
  const res = await fetch(`http://localhost:5195/api/assignees/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch assigned tasks for user ${userId}. Status: ${res.status}`);
  }

  const data = await res.json();
  return data as number[];
}