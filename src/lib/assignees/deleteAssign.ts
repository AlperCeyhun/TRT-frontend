export async function deleteAssign(taskId: number, userId: number): Promise<void> {
  const res = await fetch(`http://localhost:5195/api/assignees?taskId=${taskId}&userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to unassign user ${userId} from task ${taskId}. Status: ${res.status}`);
  }
}