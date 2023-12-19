import moment from "moment";
import { IGoal } from "../../../types";
import { getDuration } from "../../../libs/time/utils";

interface GoalDetailsProps {
  onBackClick: () => void;
  goal: IGoal;

}

export default function GoalDetails({ goal, onBackClick }: GoalDetailsProps) {
  const duration = getDuration(goal?.startDate, goal?.endDate);
  const currentDays = getDuration(goal?.startDate, new Date().toISOString());

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-3">
          <button onClick={onBackClick} className="btn btn-sm btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h5 className="flex-1 w-auto ml-5 font-bold">{goal?.title}</h5>
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
    </div>
  )
}
