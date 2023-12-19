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

      get dueGoals() {
        return self.goals.filter((g) => new Date(g.endDate) >= new Date());
      },

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
        self.goals.push(item);
        localStorage.setItem('goals', JSON.stringify(self.goals));
      },

      deleteGoal(title: string) {
        const filtered = self.goals.filter((g) => g.title !== title);
        self.goals.replace(filtered);
        localStorage.setItem('goals', JSON.stringify(self.goals));
      },

      initGoals() {
        const data = localStorage.getItem('goals');
        const goals = data ? JSON.parse(data) : [];
        self.goals = goals;
      }
    }
  });


const goalstore = GoalStore.create();

goalstore.initGoals();

export default goalstore;
