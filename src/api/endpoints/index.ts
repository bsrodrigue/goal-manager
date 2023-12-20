import { createGoal, getAllGoals } from "./goals";
import { createPartnershipRequest } from "./parnershipRequests"
import { register, login } from "./auth";

const API = {
  auth: {
    register,
    login,
  },

  partnershipRequests: {
    create: createPartnershipRequest
  },

  goals: {
    create: createGoal,
    getAll: getAllGoals,
  }
}

export default API;
