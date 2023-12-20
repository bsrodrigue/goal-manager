import { Link } from "react-router-dom";

export default function Header() {

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Goal Manager</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Account</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><Link to="/auth">Login</Link></li>
                <li><Link to="/auth">Register</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
