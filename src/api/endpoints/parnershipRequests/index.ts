import httpClient from "../../client";

interface CreatePartnershipRequestInput {
  goal: number;
  user: number;
}

export async function createPartnershipRequest(input: CreatePartnershipRequestInput) {
  const result = await httpClient.post("/partnership-requests", {
    ...input
  });

  return result.data.data;
}

export async function getAllMyPartnershipRequests() {
  const result = await httpClient.get("/partnership-requests");

  return result.data.data;
}

export async function getAllPartnershipRequestsToMe() {
  const result = await httpClient.get("/partnership-requests/toMe");

  return result.data.data;
}
