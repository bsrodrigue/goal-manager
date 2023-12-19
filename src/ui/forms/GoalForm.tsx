import moment from "moment";
import BaseInput from "../components/input/BaseInput";
import BaseTextArea from "../components/input/BaseTextArea";

interface GoalFormProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;

  onSubmit: () => void;

  isEditMode?: boolean;
}

export default function GoalForm({
  title, description, startDate,
  endDate, onTitleChange, onDescriptionChange,
  onStartDateChange, onEndDateChange, onSubmit,
  isEditMode,
}: GoalFormProps) {


  return (

    <div>
      <BaseInput value={title} onChange={onTitleChange} label="Goal Title" placeholder="What goal do you want to achieve?" />
      <BaseTextArea value={description} onChange={onDescriptionChange} label="Goal Description" placeholder="Describre your goal..." />

      <div className="flex justify-between">
        <div>
          <small className="label font-bold">Start Date</small>
          <input value={moment(startDate).format("Y-MM-DD")} onChange={(e) => onStartDateChange(e.target.value)} className="input input-bordered" type="date" />
        </div>

        <div>
          <small className="label font-bold">End Date</small>
          <input value={moment(endDate).format("Y-MM-DD")} onChange={(e) => onEndDateChange(e.target.value)} className="input input-bordered" type="date" />
        </div>
      </div>


      <button
        onClick={onSubmit}
        className="btn bg-gm-600 text-white w-full mt-5">
        {
          isEditMode ? "Edit" : "Create"
        }
      </button>
    </div>
  )
}
