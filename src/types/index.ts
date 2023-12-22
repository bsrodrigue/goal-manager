import { Instance } from "mobx-state-tree";
import { Goal } from "../mobx/models/GoalStore";
import { User, SessionStore } from "../mobx/models/SessionStore";
import { PartnershipRequest } from "../mobx/models/PartnershipRequestStore";

export interface IGoal extends Instance<typeof Goal> { }

export interface IUser extends Instance<typeof User> { }

export interface ISessionStore extends Instance<typeof SessionStore> { }

export interface IPartnershipRequest extends Instance<typeof PartnershipRequest> { }
