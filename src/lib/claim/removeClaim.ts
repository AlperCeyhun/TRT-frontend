export async function removeClaim(userId: number, claimId: number) {
  const res = await fetch(`http://localhost:5195/api/users/remove-claim`, {
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
    throw new Error(`Failed to remove claim. Status: ${res.status}`);
  }

  return true;
}