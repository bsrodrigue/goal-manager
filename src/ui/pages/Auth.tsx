import { useState } from "react";
import BaseInput from "../components/input/BaseInput";
import { observer } from "mobx-react-lite";
import { sessionStore } from "../../mobx/models";
import { useNavigate } from "react-router-dom";

const AuthPage = observer(() => {
  const [currentTab, setCurrentTab] = useState("register");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");


  const handleRegisterTab = () => {
    setCurrentTab("register");
  }

  const handleLoginTab = () => {
    setCurrentTab("login");
  }

  const handleSubmitRegister = () => {
    if (!email || !password || !username) {
      alert("Provide valid email, username and password pliz");
      return;
    }
    sessionStore.register(email, username, password).then(() => {
      navigate("/");
    });
  }

  const handleSubmitLogin = () => {
    if (!email || !password) {
      alert("Provide valid email and password pliz");
      return;
    }
    sessionStore.login(email, password).then(() => {
      navigate("/");
    });
  }

  return (
    <div className="flex flex-col justify-between h-full">
      {

        sessionStore.token && (
          <>

          </>
        )
      }

      {
        !sessionStore.token && (
          <>

            <div role="tablist" className="tabs tabs-boxed my-5">
              <a onClick={handleRegisterTab} role="tab" className={`tab font-bold ${currentTab === "register" ? "tab-active" : ""}`}>Register</a>
              <a onClick={handleLoginTab} role="tab" className={`tab font-bold ${currentTab === "login" ? "tab-active" : ""}`}>Login</a>
            </div>

            <div>
              {
                currentTab === "register" && (
                  <>
                    <label className="font-bold">Register</label>
                    <BaseInput value={email} onChange={setEmail} label="Email" placeholder="Enter your email address..." />
                    <BaseInput value={username} onChange={setUsername} label="Username" placeholder="Enter your username..." />
                    <BaseInput type="password" value={password} onChange={setPassword} label="Password" placeholder="Enter your password" />
                    <BaseInput type="password" value={password2} onChange={setPassword2} label="Password Confirmation" placeholder="Validate your password" />

                    <LoadingButton title="Register" loading={sessionStore.state === "pending"} onClick={handleSubmitRegister} />
                  </>
                )
              }

              {
                currentTab === "login" && (
                  <>
                    <label className="font-bold">Login</label>
                    <BaseInput value={email} onChange={setEmail} label="Email" placeholder="Enter your email address..." />
                    <BaseInput type="password" onChange={setPassword} value={password} label="Password" placeholder="Enter your password" />

                    <LoadingButton title="Login" loading={sessionStore.state === "pending"} onClick={handleSubmitLogin} />
                  </>
                )
              }
            </div>
          </>
        )
      }

    </div>
  )
}
)

export default AuthPage;


function LoadingButton({ loading, title, onClick }: { loading?: boolean, title: string, onClick: () => void }) {
  return (
    <button className="btn bg-gm-600 text-white w-full mt-5" onClick={onClick}>
      {
        loading ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          title
        )
      }
    </button>
  )
}
