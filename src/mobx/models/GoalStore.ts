import { flow, types } from "mobx-state-tree";
import { IGoal } from "../../types";
import { Toaster } from "../../libs/notifications/toast";
import API from "../../api/endpoints";
import { sessionStore } from ".";

class SyncTable {
  static table: Record<string, boolean> = {};
  static storageKey = "sync-table";

  static init() {
    const loaded = localStorage.getItem(SyncTable.storageKey);

    if (loaded) {
      SyncTable.table = JSON.parse(loaded);
    }
  }

  static store(uuid: string, synced: boolean) {
    SyncTable.table[uuid] = synced;

    localStorage.setItem(SyncTable.storageKey, JSON.stringify(SyncTable.table));
  }
}


export const Goal = types.model("Goal", {
  uuid: types.identifier,
  id: types.maybe(
    types.integer
  ),
  status: types.enumeration(["to-be-started", "ongoing", "succeeded", "failed"]),
  title: types.string,
  description: types.string,
  startDate: types.Date,
  endDate: types.Date,
  createdAt: types.Date,
  updatedAt: types.Date,
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
      addGoal: flow(function*(title: string, description: string, startDate: Date, endDate: Date) {
        const date = new Date();
        const uuid = crypto.randomUUID();
        let synced = true;

        const item = {
          title,
          description,
          startDate,
          endDate,
          uuid,
          id: undefined,
          createdAt: date,
          updatedAt: date,
        };

        if (sessionStore.token) {
          try {
            const result = yield API.goals.create(item);
            item.id = result.id;
          } catch (error) {
            synced = false;
            Toaster.error("Server sync failed");
          }
        }

        SyncTable.store(uuid, synced);
        self.goals.push({ status: "to-be-started", ...item });
        Toaster.success("Goal created with success");
      }),

      deleteGoal(title: string) {
        const filtered = self.goals.filter((g) => g.title !== title);
        self.goals.replace(filtered);
        Toaster.success("Goal deleted with success");
      },

      selectGoal(goal: IGoal) {
        self.selectedGoal = goal;
      },

      initGoals: flow(function*() {
        SyncTable.init();

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
