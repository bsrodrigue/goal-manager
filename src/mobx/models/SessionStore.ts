import { AxiosError } from "axios";
import { flow, types } from "mobx-state-tree";
import { IUser } from "../../types";
import { Toaster } from "../../libs/notifications/toast";
import API from "../../api/endpoints";

export const User = types.model("User", {
  id: types.number,
  username: types.string,
  email: types.string,
  score: types.number,
})

  .actions((self) => ({

    fromObject: (user: IUser) => {
      self.id = user.id;
      self.username = user.username;
      self.email = user.email;
      self.score = user.score;
    }

  }))
  ;

export const SessionStore = types.model("SessionStore", {
  token: types.string,
  state: types.enumeration("State", ["pending", "done", "error"]),
  user: User,
})
  .actions((self) => (
    {

      initSession: () => {
        const token = localStorage.getItem("token") || "";
        const userData = localStorage.getItem("user");

        if (userData) {
          const user: IUser = JSON.parse(userData);
          self.user.fromObject(user);
        }

        self.token = token;
      },

      register: flow(function*(email: string, username: string, password: string) {
        self.state = "pending";

        try {
          const result: { jwt: string, user: IUser } = yield API.auth.register({ email, username, password });
          self.token = result.jwt;
          self.user.fromObject(result.user);

          Toaster.success("Welcome to the platform");

          self.state = "done";

        } catch (error) {
          if (error instanceof AxiosError) {
            Toaster.error(`An error occured:  ${error.response?.data.error.message}`);
          }
          console.error(error);
          self.state = "error";
        }

      }),

      login: flow(function*(identifier: string, password: string) {
        self.state = "pending";

        try {
          const result: { token: string, user: IUser } = yield API.auth.login({ identifier, password });
          self.token = result.token;
          self.user = result.user;

          Toaster.success("Welcome  back to the platform");

          self.state = "done";

        } catch (error) {
          if (error instanceof AxiosError) {
            Toaster.error(`An error occured:  ${error.response?.data.error.message}`);
          }
          console.error(error);
          self.state = "error";
        }

      }),
    }

  ));
