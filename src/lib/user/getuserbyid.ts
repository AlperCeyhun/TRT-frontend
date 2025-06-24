import { getUsers, User } from "@/lib/user/getusers";

export async function getUserNameById(id: number): Promise<string | undefined> {
  const users: User[] = await getUsers();
  const user = users.find((u) => u.id === id);
  return user?.username;
}