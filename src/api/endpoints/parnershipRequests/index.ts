import httpClient from "../../client";


interface CreatePartnershipRequestInput {
  goal: number;
  user: number;
}

export async function createPartnershipRequest(input: CreatePartnershipRequestInput) {
  const result = await httpClient.post("/partnership-requests", {
    ...input
  });

  return result.data;
}
