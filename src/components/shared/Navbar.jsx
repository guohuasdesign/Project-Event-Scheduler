import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../context";
const Navbar = () => {
  const { signedIn, handleSignOut } = useAuth();

  return (
    <div className="navbar bg-black shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-white text-xl ml-4 font-semibold">
          Event Scheduler
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {signedIn ? (
            <>
              <li>
                <button className="btn btn-accent mr-3">
                  <Link to="createEvent">Create Event</Link>
                </button>
              </li>
              <li>
                <button className="btn btn-primary" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link className="btn btn-primary" to="/signin">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
