export async function postAssign(taskId: number, assigneeIds: number[]): Promise<void> {
  const res = await fetch(`http://localhost:5195/api/assignees/assign?taskId=${taskId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.token,
    },
    body: JSON.stringify(assigneeIds),
  });

  if (!res.ok) {
    throw new Error(`Failed to assign users to task ${taskId}. Status: ${res.status}`);
  }
}