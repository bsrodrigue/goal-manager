import { observer } from "mobx-react-lite";
import { useState } from "react";
import goalstore from "./mobx/models";
import { IGoal } from "./types";
import GoalList from "./ui/components/list/GoalList";
import GoalDetails from "./ui/components/details/GoalDetails";
import GoalForm from "./ui/forms/GoalForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"
import BaseInput from "./ui/components/input/BaseInput";
import { UserGroupIcon } from "@heroicons/react/16/solid";


const App = observer(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detailedMode, setDetailedMode] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  const hanleSubmit = () => {
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
    setDetailedMode(true);

    setIsEditMode(true);
    setTitle(goal.title);
    setDescription(goal.description);
    setStartDate(goal.startDate.toISOString());
    setEndDate(goal.endDate.toISOString());
  }

  const handleBackClick = () => {
    setDetailedMode(false);
    setIsEditMode(false);
    clearForm();
  }

  return (
    <main className="bg-gm-500 h-screen flex flex-col md:py-10 justify-center items-center">

      <div className="bg-white flex flex-col justify-between h-full w-full md:max-w-xl p-5 rounded drop-shadow-md">
        <div>
          <div className="flex justify-between mb-5">
            <p className="font-bold">Goal Manager</p>

            <div>
              {
                isSynced ? (
                  <div className="badge badge-accent text-white">synced</div>
                ) : (
                  <div className="badge">not synced</div>
                )
              }
            </div>
          </div>

          {
            !detailedMode && (
              <>
                <input onChange={(e) => setSearchTerm(e.target.value)} className="input bg-gm-500 bg-opacity-10 w-full" placeholder="Search goals..." type="text" />
                <GoalList goals={goalstore.findByTitle(searchTerm)} onClickItem={handleGoalClick} />
              </>
            )
          }

          {
            detailedMode && (
              <GoalDetails goal={goalstore.selectedGoal!} onBackClick={handleBackClick} />
            )
          }
        </div>


        <div>
          <div className="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" />
            <div className="flex justify-start gap-3 collapse-title text-sm font-bold">
              <label>
                Accountability Partners
              </label>
              <UserGroupIcon className="h-5" />
            </div>
            <div className="collapse-content">

              <BaseInput value={""} onChange={() => { }} label="Partner" placeholder="Search a partner..." />
            </div>
          </div>

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
                onSubmit={hanleSubmit}
              />
            </div>
          </div>

        </div>




      </div>
      <ToastContainer />
    </main>
  );
}
)

export default App
