import { flow, types } from "mobx-state-tree";
import API from "../../api/endpoints";
import { Toaster } from "../../libs/notifications/toast";

export const PartnershipRequest = types.model("PartnershipRequest", {
  id: types.maybe(types.integer),
  status: types.enumeration(["pending", "rejected", "accepted"]),
  user: types.integer,
  goal: types.model("Goal", {
    id: types.integer,
    title: types.string,
  }),
});

export const PartnershipRequestStore = types.model("PartnershipRequestStore", {
  requests: types.array(PartnershipRequest),
  toMe: types.array(PartnershipRequest),
})

  .views((self) => (
    {
      get pendingRequests() {
        return self.requests.filter((req) => req.status === "pending");
      },

      get rejectedRequests() {
        return self.requests.filter((req) => req.status === "rejected");
      },

      get acceptedRequests() {
        return self.requests.filter((req) => req.status === "accepted");
      },
    }
  ))

  .actions((self) => (
    {
      init: flow(function*() {
        try {
          const result = yield API.partnershipRequests.getAllMy();

          result.forEach(element => {
            self.requests.push({
              user: element.attributes.user.data.id,
              goal: element.attributes.goal.data.id,
              status: element.attributes.status,
              id: element.id
            });
          });

          const toMeResult = yield API.partnershipRequests.getAllToMe();

          toMeResult.forEach(element => {
            self.toMe.push({
              user: element.attributes.user.data.id,
              goal: element.attributes.goal.data.id,
              status: element.attributes.status,
              id: element.id
            });
          });

        } catch (error) {
          console.error(error);
        }

      }),


      makeRequest: flow(function*(goalId: number, partnerId: number) {
        try {
          const result = yield API.partnershipRequests.create({ goal: goalId, user: partnerId });

          self.requests.push({
            user: result.attributes.user.data.id,
            goal: result.attributes.goal.data.id,
            status: result.attributes.status,
            id: result.id
          });

          Toaster.success("Request sent with success");
        } catch (error) {
          console.error(error);
        }
      }),

    }

  ));
