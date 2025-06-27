import { Claim } from "@/lib/claim/getAllClaim";

export async function getUserClaim(id: number): Promise<Claim[]> {
  const res = await fetch(`http://localhost:5195/api/users/user-claims/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users. Status: ${res.status}`);
  }

  const data = await res.json();
  return data as Claim[];
}