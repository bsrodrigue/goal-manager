import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { sessionStore } from "../../../../mobx/models";

const Header = observer(() => {
  const user = sessionStore.user;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Goal Manager</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>{
                user?.username || "Account"
              }</summary>
              <ul className="p-2 bg-base-100 rounded-t-none z-10">
                <li><Link to="/auth">Authenticate</Link></li>
                <li><Link to="/requests">Requests</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
})

export default Header;
