export type User = {
  id: number;
  username: string;
  assignees: number[];
};

export async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:5195/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users. Status: ${res.status}`);
  }

  const data = await res.json();
  return data as User[];
}