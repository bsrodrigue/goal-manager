import { observer } from "mobx-react-lite";
import { useState } from "react";
import goalstore from "./mobx/models";
import { IGoal } from "./types";
import GoalList from "./ui/components/list/GoalList";
import GoalDetails from "./ui/components/details/GoalDetails";
import GoalForm from "./ui/forms/GoalForm";

const App = observer(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detailedMode, setDetailedMode] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<IGoal>();

  const [searchTerm, setSearchTerm] = useState("");

  const hanleSubmit = () => {
    if (!title || !description || !startDate || !endDate) {
      return;
    }

    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");

    goalstore.addGoal(title, description, new Date(startDate), new Date(endDate));
  }

  const handleGoalClick = (goal: IGoal) => {
    setCurrentGoal(goal);
    setDetailedMode(true);
  }

  const handleBackClick = () => {
    setCurrentGoal(undefined);
    setDetailedMode(false);
  }

  return (
    <main className="bg-gm-500 h-screen flex flex-col gap-5 justify-center items-center">

      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className="tab text-white">Dashboard</a>
        <a role="tab" className="tab tab-active [--tab-border-color:orange] text-white">Partners</a>
        <a role="tab" className="tab text-white">Account</a>
      </div>

      <div className="bg-white flex flex-col justify-between h-full md:max-h-[75vh] w-full md:max-w-xl p-5 rounded drop-shadow-md">
        <div>
          <div className="flex justify-center mb-5">
            <p className="font-bold">Goal Manager</p>
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
            detailedMode && currentGoal && (
              <GoalDetails goal={currentGoal} onBackClick={handleBackClick} />
            )
          }

        </div>


        <GoalForm
          title={title} description={description}
          startDate={startDate} endDate={endDate}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSubmit={hanleSubmit}
        />

      </div>
    </main>
  );
}
)

export default App
