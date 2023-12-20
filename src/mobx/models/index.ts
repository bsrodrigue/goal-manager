import { flow, onSnapshot, types } from "mobx-state-tree";
import { IGoal } from "../../types";
import { Toaster } from "../../libs/notifications/toast";
import API from "../../api/endpoints";

export const SessionStore = types.model("SessionStore", {
  token: types.string,
  user: types.model("User", {
    id: types.identifier,
    username: types.string,
    email: types.string,
    score: types.number,
  })
});

export const Goal = types.model("Goal", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  startDate: types.Date,
  endDate: types.Date,
})

  .actions((self) => {
    return {
      update(fields: Partial<IGoal>) {
        self.title = fields.title || self.title;
        self.description = fields.description || self.description;
        self.startDate = fields.startDate || self.startDate;
        self.endDate = fields.endDate || self.endDate;

        Toaster.success("Goal updated with success");
      }
    }
  });


export const GoalStore = types.model("GoalStore", {
  goals: types.array(Goal),
  selectedGoal: types.safeReference(Goal),
  state: types.enumeration("State", ["pending", "done", "error"]),
})

  .views((self) => {
    return {

      findByTitle(title: string) {
        return self.goals.filter((g) => g.title.toLowerCase().startsWith(title.toLowerCase()));
      },

      findByDescription(description: string) {
        return self.goals.filter((g) => g.description.toLowerCase().startsWith(description.toLowerCase()));
      }
    }
  })

  .actions((self) => {
    return {
      addGoal(title: string, description: string, startDate: Date, endDate: Date) {
        const item = { title, description, startDate, endDate };
        const id = crypto.randomUUID();

        // Try to create on server with uuid

        try {
          API.goals.create(item);
        } catch (error) {
          Toaster.error("Error while saving goal on server, local storage fallback");
        }

        self.goals.push({ id, ...item });
        Toaster.success("Goal created with success");
      },

      deleteGoal(title: string) {
        const filtered = self.goals.filter((g) => g.title !== title);
        self.goals.replace(filtered);
        Toaster.success("Goal deleted with success");
      },


      selectGoal(goal: IGoal) {
        self.selectedGoal = goal;
      },

      initGoals: flow(function*() {
        self.state = "pending";

        try {
          const serverGoals = yield API.goals.getAll();
          // Sync (compare and update)
          console.log(serverGoals);
        } catch (error) {
          console.error(error);
          self.state = "error";
        }

        self.state = "done";

        const data = localStorage.getItem('goals');
        const goals = data ? JSON.parse(data) : [];
        self.goals = goals;
      }),


      sync: flow(function*() {
        self.state = "pending";

        try {
          const serverGoals = yield API.goals.getAll();
          // Sync (compare and update)
          console.log(serverGoals);
        } catch (error) {
          console.error(error);
          self.state = "error";
        }

        self.state = "done";

      }),
    }
  });

const goalstore = GoalStore.create({ state: "done" });

export const sessionStore = SessionStore.create();

goalstore.initGoals();

setInterval(() => {
  goalstore.sync();
}, 15 * 60 * 1000);

onSnapshot(goalstore, (snapshot) => {
  console.info(snapshot);
  localStorage.setItem('goals', JSON.stringify(snapshot.goals));
});

export default goalstore;
