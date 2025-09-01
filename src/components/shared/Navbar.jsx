import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-black shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Event Scheduler</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Sign In</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
