import { observer } from "mobx-react-lite";
import { useState } from "react";
import { goalstore } from "./mobx/models";

interface InputProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function Input({ label, placeholder, onChange }: InputProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <input
        type="text"
        className="input input-bordered w-full"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} />
    </div>
  )
}

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function TextArea({ label, placeholder, onChange }: TextAreaProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <textarea
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

  const [searchTerm, setSearchTerm] = useState("");


  const hanleSubmit = () => {
    if (!title || !description || !startDate || !endDate) {
      return;
    }

    goalstore.addGoal(title, description, new Date(startDate), new Date(endDate));
  }

  return (
    <main className="bg-gm-500 h-screen flex justify-center items-center">


      <div className="bg-white flex flex-col justify-between h-full md:max-h-[700px] w-full md:max-w-xl p-5 rounded drop-shadow-md">
        <div>
          <div className="flex justify-center mb-5">
            <p className="font-bold">Goal Manager</p>
          </div>

          <input className="input bg-gm-500 bg-opacity-10 w-full" placeholder="Search goals..." type="text" />

          <ul className="ul">
            {
              goalstore.findByTitle(searchTerm).map((goal) => (
                <li>{goal.title}</li>
              ))
            }

          </ul>
        </div>


        <div>
          <Input onChange={setTitle} label="Goal Title" placeholder="What goal do you want to achieve?" />
          <TextArea onChange={setDescription} label="Goal Description" placeholder="Describre your goal..." />


          <div className="flex justify-between">
            <div>
              <small className="label font-bold">Start Date</small>
              <input onChange={(e) => setStartDate(e.target.value)} className="input input-bordered" type="date" />
            </div>

            <div>
              <small className="label font-bold">End Date</small>
              <input onChange={(e) => setEndDate(e.target.value)} className="input input-bordered" type="date" />
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
