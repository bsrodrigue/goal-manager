import httpClient from "../../client";

export async function searchUsers(searchTerm: string) {
  const result = await httpClient.get(`users?filters[username][$containsi]=${searchTerm}`);

  return result.data;
}
