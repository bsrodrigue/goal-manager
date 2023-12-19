import { onSnapshot, types } from "mobx-state-tree";
import { IGoal } from "../../types";
import { Toaster } from "../../libs/notifications/toast";

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

      initGoals() {
        const data = localStorage.getItem('goals');
        const goals = data ? JSON.parse(data) : [];
        self.goals = goals;
      },
    }
  });

const goalstore = GoalStore.create();

goalstore.initGoals();

onSnapshot(goalstore, (snapshot) => {
  console.info(snapshot);
  localStorage.setItem('goals', JSON.stringify(snapshot.goals));
});

export default goalstore;
