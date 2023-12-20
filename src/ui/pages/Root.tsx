import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"
import Header from "../components/nav/header/Header";
import { Outlet } from "react-router-dom";

const Root = observer(() => {

  return (
    <div className="bg-gm-500 h-screen flex flex-col md:py-10 justify-center items-center">
      <div className="bg-white flex flex-col justify-between h-full w-full md:max-w-xl p-5 rounded drop-shadow-md">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
)

export default Root
