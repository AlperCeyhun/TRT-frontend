export type RegisterData = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  response: string;
};

export async function postRegister(registerData: RegisterData): Promise<RegisterResponse> {
  const res = await fetch("http://localhost:5195/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!res.ok) {
    throw new Error(`Failed to register. Status: ${res.status}`);
  }

  const text = await res.text();
  return {
    response: text,
  };
}
