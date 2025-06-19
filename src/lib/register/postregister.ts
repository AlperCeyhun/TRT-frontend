export type RegisterData = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  username: string;
};

export async function postRegister(registerData: RegisterData): Promise<RegisterResponse> {
  const res = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!res.ok) {
    throw new Error(`Failed to register. Status: ${res.status}`);
  }

  const data = await res.json();

  return {
    id: data.id,
    username: data.username,
  };
}
