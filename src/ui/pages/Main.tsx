import { observer } from "mobx-react-lite";
import { useState } from "react";
import goalstore from "../../mobx/models";
import { IGoal } from "../../types";
import GoalDetails from "../components/details/GoalDetails";
import GoalList from "../components/list/GoalList";
import GoalForm from "../forms/GoalForm";

const Main = observer(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  const handleSubmit = () => {
    if (!title || !description || !startDate || !endDate) {
      return;
    }

    if (isEditMode) {
      goalstore.selectedGoal?.update({ title, description, startDate: new Date(startDate), endDate: new Date(endDate) });
      return;
    }

    goalstore.addGoal(title, description, new Date(startDate), new Date(endDate));

    clearForm();
  }

  const handleGoalClick = (goal: IGoal) => {
    goalstore.selectGoal(goal);

    setIsEditMode(true);
    setTitle(goal.title);
    setDescription(goal.description);
    setStartDate(goal.startDate.toISOString());
    setEndDate(goal.endDate.toISOString());
  }

  const handleBackClick = () => {
    goalstore.selectGoal(undefined);
    setIsEditMode(false);
    clearForm();
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {
          !goalstore.selectedGoal && (
            <>
              <input onChange={(e) => setSearchTerm(e.target.value)} className="input bg-gm-500 bg-opacity-10 w-full" placeholder="Search goals..." type="text" />
              <GoalList goals={goalstore.findByTitle(searchTerm)} onClickItem={handleGoalClick} />
            </>
          )
        }
        {
          goalstore.selectedGoal && (
            <GoalDetails onBackClick={handleBackClick} />
          )
        }
      </div>

      <div>

        <div className="collapse collapse-arrow">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-sm font-bold">{
            isEditMode ? "Modify your goal" : "Create your goal"
          }</div>
          <div className="collapse-content">
            <GoalForm
              isEditMode={isEditMode}
              title={title} description={description}
              startDate={startDate} endDate={endDate}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

      </div>
    </div>

  )
}
)

export default Main;
