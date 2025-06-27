export type Claim = {
    id: number;
    claimName: string;
}

export async function getAllClaim(): Promise<Claim[]> {
  const res = await fetch(`http://localhost:5195/api/users/claims`, {
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