import React from "react";
import { Link, Outlet } from "react-router-dom";
import EcoMapLogo from "../assets/logo.svg";
import AccountLogo from "../assets/account.png";

const Navbar = () => {
  return (
    <>
      <nav className="bg-green-800 text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={EcoMapLogo} alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold hover:text-green-300">
            EcoMap
          </Link>

          <ul className="flex space-x-4">
            <li>
              <Link
                to="/occurrence"
                className="hover:text-green-300 transition-colors"
              >
                Occurrence
              </Link>
            </li>
            <li>
              <Link
                to="/species"
                className="hover:text-green-300 transition-colors"
              >
                Species
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {/* If logged in, send user to 
          expert/ 
          else go to 
          expert/login */}

          <Link to="/expert/login">
            <img
              src={AccountLogo}
              alt=""
              className="w-8 h-8 transition-colors hover:invert"
            />
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
