import { observer } from "mobx-react-lite";
import { useState } from "react";
import goalstore, { Goal } from "./mobx/models";
import { Instance } from "mobx-state-tree";
import moment from "moment";

function getDuration(date1: string, date2: string) {
  if (new Date(date1) >= new Date(date2)) return 0;
  const start = moment(date1);
  const end = moment(date2);

  return end.diff(start, 'days');
}

interface IGoal extends Instance<typeof Goal> { }

interface InputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function Input({ value, label, placeholder, onChange }: InputProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <input
        value={value}
        type="text"
        className="input input-bordered w-full"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} />
    </div>
  )
}

interface TextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function TextArea({ value, label, placeholder, onChange }: TextAreaProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <textarea
        value={value}
        className="textarea textarea-bordered"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} ></textarea>
    </div>
  )
}


const App = observer(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detailedMode, setDetailedMode] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<IGoal>();

  const [searchTerm, setSearchTerm] = useState("");

  const duration = getDuration(currentGoal?.startDate, currentGoal?.endDate);
  const currentDays = getDuration(currentGoal?.startDate, new Date().toISOString());


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

  return (
    <main className="bg-gm-500 h-screen flex justify-center items-center">


      <div className="bg-white flex flex-col justify-between h-full md:max-h-[700px] w-full md:max-w-xl p-5 rounded drop-shadow-md">
        <div>
          <div className="flex justify-center mb-5">
            <p className="font-bold">Goal Manager</p>
          </div>

          {
            !detailedMode && (
              <>
                <input onChange={(e) => setSearchTerm(e.target.value)} className="input bg-gm-500 bg-opacity-10 w-full" placeholder="Search goals..." type="text" />
                <ul className="my-5">
                  {
                    goalstore.findByTitle(searchTerm).map((goal) => (
                      <li
                        onClick={() => {
                          setCurrentGoal(goal);
                          setDetailedMode(true);
                        }}
                        className="ml-5 list-disc hover:cursor-pointer">
                        {goal.title}</li>
                    ))
                  }
                </ul>
              </>
            )
          }

          {
            detailedMode && currentGoal && (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={() => {
                      setDetailedMode(false);
                      setCurrentGoal(undefined);
                    }} className="btn btn-sm btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h5 className="flex-1 w-auto ml-5 font-bold">{currentGoal?.title}</h5>
                  </div>
                  <label>Description</label>
                  <p className="italic opacity-60">{currentGoal?.description}</p>
                </div>

                <div>
                  <label>Progress: {currentDays}/{duration} days</label>
                  <progress className="progress w-full" value={currentDays} max={duration}></progress>
                  <div className="flex justify-between">
                    <label>{moment(currentGoal.startDate).format("D/M/Y")}</label>
                    <label>{moment(currentGoal.endDate).format("D/M/Y")}</label>
                  </div>
                </div>
              </div>
            )
          }

        </div>


        <div>
          <div className=" divider"></div>
          <Input value={title} onChange={setTitle} label="Goal Title" placeholder="What goal do you want to achieve?" />
          <TextArea value={description} onChange={setDescription} label="Goal Description" placeholder="Describre your goal..." />


          <div className="flex justify-between">
            <div>
              <small className="label font-bold">Start Date</small>
              <input value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered" type="date" />
            </div>

            <div>
              <small className="label font-bold">End Date</small>
              <input value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-bordered" type="date" />
            </div>
          </div>


          <button
            onClick={hanleSubmit}
            className="btn bg-gm-600 text-white w-full mt-5">
            Create
          </button>
        </div>
      </div>
    </main>
  );
}
)

export default App
