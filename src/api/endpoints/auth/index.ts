import httpClient from "../../client";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export async function register(input: RegisterInput) {
  const result = await httpClient.post("/auth/local/register", {
    ...input
  });

  return result.data;
}

interface LoginInput {
  identifier: string;
  password: string;
}

export async function login(input: LoginInput) {
  const result = await httpClient.post("/auth/local", {
    ...input
  });

  return result.data;
}
