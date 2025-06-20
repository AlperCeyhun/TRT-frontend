export type AssignPayload = {
  assigneeId: number[];
};

export async function postAssign(taskId: number, assigneeIds: number[]): Promise<void> {
  const res = await fetch(`http://localhost:5195/api/assignees/assign/${taskId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assigneeId: assigneeIds }),
  });

  if (!res.ok) {
    throw new Error(`Failed to assign users to task ${taskId}. Status: ${res.status}`);
  }
}
