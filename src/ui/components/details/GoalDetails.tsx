import moment from "moment";
import { IGoal } from "../../../types";
import { getDuration } from "../../../libs/time/utils";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import goalstore from "../../../mobx/models";
import { observer } from "mobx-react-lite";

interface GoalDetailsProps {
  onBackClick: () => void;
  goal: IGoal;

}

type ActionType = "delete" | "edit" | "none";

const GoalDetails = observer(({ goal, onBackClick }: GoalDetailsProps) => {
  const duration = getDuration(goal?.startDate, goal?.endDate);
  const currentDays = getDuration(goal?.startDate, new Date().toISOString());

  const [actionConfirm, setActionConfirm] = useState<ActionType>("none");

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
      </div>
    </div >
  )
}
)
export default GoalDetails;
