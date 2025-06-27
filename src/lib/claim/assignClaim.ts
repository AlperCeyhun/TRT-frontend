export async function assignClaim(userId: number, claimId: number) {
  const res = await fetch(`http://localhost:5195/api/users/assign-claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      userId,
      claimId,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to assign claim. Status: ${res.status}`);
  }

  return true;
}
