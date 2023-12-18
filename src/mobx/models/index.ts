import { types } from "mobx-state-tree";

export const Goal = types.model("Goal", {
  title: types.string,
  description: types.string,
  startDate: types.Date,
  endDate: types.Date,
});

export const GoalStore = types.model("GoalStore", {
  goals: types.array(Goal),
})

  .views((self) => {
    return {

      findByTitle(title: string) {
        return self.goals.filter((g) => g.title.toLowerCase().includes(title.toLowerCase()));
      },

      findByDescription(description: string) {
        return self.goals.filter((g) => g.description.toLowerCase().includes(description.toLowerCase()));
      }
    }
  })

  .actions((self) => {
    return {
      addGoal(title: string, description: string, startDate: Date, endDate: Date) {
        self.goals.push({ title, description, startDate, endDate });
      }
    }
  });


export const goalstore = GoalStore.create();
