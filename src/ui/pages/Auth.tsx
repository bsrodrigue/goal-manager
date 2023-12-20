import { useState } from "react";
import BaseInput from "../components/input/BaseInput";

export default function AuthPage() {
  const [currentTab, setCurrentTab] = useState("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterTab = () => {
    setCurrentTab("register");
  }

  const handleLoginTab = () => {
    setCurrentTab("login");
  }

  const handleSubmitLogin = () => {

  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div role="tablist" className="tabs tabs-boxed my-5">
        <a onClick={handleRegisterTab} role="tab" className={`tab font-bold ${currentTab === "register" ? "tab-active" : ""}`}>Register</a>
        <a onClick={handleLoginTab} role="tab" className={`tab font-bold ${currentTab === "login" ? "tab-active" : ""}`}>Login</a>
      </div>

      <div>
        {
          currentTab === "register" && (
            <>
              <label className="font-bold">Register</label>
              <BaseInput value={""} label="Email" placeholder="Enter your email address..." />
              <BaseInput value={""} label="Username" placeholder="Enter your username..." />
              <BaseInput value={""} label="Password" placeholder="Enter your password" />
              <BaseInput value={""} label="Password Confirmation" placeholder="Validate your password" />

              <button className="btn bg-gm-600 text-white w-full mt-5">Register</button>
            </>
          )
        }

        {
          currentTab === "login" && (
            <>
              <label className="font-bold">Login</label>
              <BaseInput value={email} onChange={setEmail} label="Email" placeholder="Enter your email address..." />
              <BaseInput type="password" onChange={setPassword} value={password} label="Password" placeholder="Enter your password" />

              <button className="btn bg-gm-600 text-white w-full mt-5">Login</button>
            </>
          )
        }
      </div>

    </div>
  )
}
