import moment from "moment";
import { getDuration } from "../../../libs/time/utils";
import { TrashIcon, CheckIcon, XMarkIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import goalstore, { partnershipRequestStore } from "../../../mobx/models";
import { observer } from "mobx-react-lite";
import API from "../../../api/endpoints";
import { debounce } from "../../../libs/utils";
import BaseInput from "../input/BaseInput";
import { IUser } from "../../../types";
import { Toaster } from "../../../libs/notifications/toast";

interface GoalDetailsProps {
  onBackClick: () => void;
}

type ActionType = "delete" | "edit" | "none";



const GoalDetails = observer(({ onBackClick }: GoalDetailsProps) => {
  if (!goalstore.selectedGoal) return;

  const goal = goalstore.selectedGoal;


  function checkRequestSent(userId: number, goalId: number) {
    return partnershipRequestStore.pendingRequests.find((req) => (req.user === userId && req.goal === goalId));
  }


  const duration = getDuration(goal?.startDate, goal?.endDate);
  const currentDays = getDuration(goal?.startDate, new Date().toISOString());

  const [actionConfirm, setActionConfirm] = useState<ActionType>("none");

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handlePartnerSearch = debounce(async (searchTerm: string) => {

    try {
      setIsSearching(true);
      const result = await API.users.search.username(searchTerm);
      setSearchResults(result);

    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }

  }, 1000);


  const handlePartnershipRequest = async (userId: number) => {
    try {
      if (!goal.id) return;
      await partnershipRequestStore.makeRequest(goal.id, userId);
    } catch (error) {

      console.error(error);
    }

  }


  const handleDelete = () => {
    onBackClick();
    setActionConfirm("none");
    goalstore.deleteGoal(goal.title);
  }

  const handleDeleteClick = () => {
    setActionConfirm("delete");
  }

  const handleCancelClick = () => {
    setActionConfirm("none");
  }

  const handleActionConfirm = () => {
    if (!actionConfirm) return;

    switch (actionConfirm) {
      case "delete":
        handleDelete();
        break;

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-3">
          <button onClick={onBackClick} className="btn btn-sm btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h5 className="flex-1 w-auto ml-5 font-bold">{goal?.title}</h5>
          {
            actionConfirm === "delete" ? (
              <div className="tooltip tooltip-open tooltip-right" data-tip="Are you sure?">
                <button onClick={handleActionConfirm} className="btn btn-error btn-circle btn-sm text-white">
                  <CheckIcon className="h-5" />
                </button>
                <button onClick={handleCancelClick} className="ml-3 btn bg-black btn-circle text-white btn-sm">
                  <XMarkIcon className="h-5" />
                </button>
              </div>
            ) : (
              <button onClick={handleDeleteClick} className="btn btn-sm btn-error btn-circle">
                <TrashIcon className="h-5 text-white" />
              </button>
            )
          }
        </div>
        <label>Description</label>
        <p className="italic opacity-60">{goal?.description}</p>
      </div>

      <div>
        <label>Progress: {currentDays}/{duration} days</label>
        <progress className="progress w-full" value={currentDays} max={duration}></progress>
        <div className="flex justify-between">
          <label>{moment(goal.startDate).format("D/M/Y")}</label>
          <label>{moment(goal.endDate).format("D/M/Y")}</label>
        </div>
        <button className="btn btn-primary w-full btn-sm my-3">
          Start Project
        </button>
      </div>


      <div className="collapse collapse-arrow">
        <input type="radio" name="my-accordion-2" />
        <div className="flex justify-start gap-3 collapse-title text-sm font-bold">
          <label>
            Accountability Partners
          </label>
          <UserGroupIcon className="h-5" />
        </div>
        <div className="collapse-content">
          <BaseInput
            onChange={(value) => {
              handlePartnerSearch(value);
            }}
            label="Partner"
            placeholder="Search a partner..." />
          {
            isSearching ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              <ul className="ul bg-gm-100 px-3 py-1 bg-opacity-75 rounded">
                {
                  searchResults.map((user: IUser) => {
                    const sent = checkRequestSent(user.id, goal.id);

                    return (

                      <li key={user.id} className="flex items-center justify-between my-2">
                        <p>{user.username}</p>
                        <div>
                          <button
                            disabled={sent}
                            className="btn btn-sm"
                            onClick={() => handlePartnershipRequest(user.id)}
                          >
                            {
                              sent ? "Pending..." : "Request"
                            }
                          </button>
                        </div>
                      </li>
                    )
                  }
                  )
                }
              </ul>
            )
          }
        </div>
      </div>

    </div >
  )
}
)
export default GoalDetails;
