import httpClient from "../../client";

export type GoalStatus = "to-be-started" | "ongoing" | "succeeded" | "failed";

interface CreateGoalInput {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export async function createGoal(input: CreateGoalInput) {
  const result = await httpClient.post("goals", {
    ...input
  });

  return result.data;
}

export async function getAllGoals() {
  const result = await httpClient.get("goals");

  return result.data;
}
