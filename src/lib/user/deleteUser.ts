export async function deleteUser(id: number) {
  const res = await fetch(`http://localhost:5195/api/users/${id}`, {
    method: 'DELETE',
    headers: {
          "Authorization": "Bearer " + localStorage.token,
    }});

  if (!res.ok) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
  
  return true;
}
