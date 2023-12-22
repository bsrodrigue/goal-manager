import { onSnapshot } from "mobx-state-tree";
import { GoalStore } from "./GoalStore";
import { SessionStore } from "./SessionStore";
import { PartnershipRequestStore } from "./PartnershipRequestStore";

const initialSession = {
  token: "",
  state: "done",
  user: {
    username: "",
    id: 0,
    email: "",
    score: 0
  }
}

const goalstore = GoalStore.create({ state: "done" });
export const partnershipRequestStore = PartnershipRequestStore.create();

export const sessionStore = SessionStore.create(initialSession);

sessionStore.initSession();

if (sessionStore.token) {
  goalstore.initGoals();
  partnershipRequestStore.init();
}

onSnapshot(goalstore, (snapshot) => {
  localStorage.setItem('goals', JSON.stringify(snapshot.goals));
});

onSnapshot(sessionStore, (snapshot) => {
  localStorage.setItem('token', snapshot.token);
  snapshot.user && localStorage.setItem('user', JSON.stringify(snapshot.user));
});

onSnapshot(partnershipRequestStore, (snaphot) => {
  console.log(snaphot);
});

export default goalstore;
