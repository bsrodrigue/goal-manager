import { createGoal, getAllGoals } from "./goals";
import { createPartnershipRequest, getAllMyPartnershipRequests, getAllPartnershipRequestsToMe } from "./parnershipRequests"
import { register, login } from "./auth";
import { searchUsers } from "./users";

const API = {
  auth: {
    register,
    login,
  },

  users: {
    search: {
      username: searchUsers
    }
  },

  partnershipRequests: {
    create: createPartnershipRequest,
    getAllMy: getAllMyPartnershipRequests,
    getAllToMe: getAllPartnershipRequestsToMe,
  },

  goals: {
    create: createGoal,
    getAll: getAllGoals,
  }
}

export default API;
