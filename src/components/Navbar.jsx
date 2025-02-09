import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import EcoMapLogo from "../assets/ecomap_logo.png";
import AccountLogo from "../assets/account.png";
import { useAuth } from "@/context/AuthContext";
import { sidebarTabs } from "@/constants";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-green-800 text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="sm:hidden block">
                <Menu className="text-white h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-gray-800 text-white w-64 p-4"
            >
              <h2 className="text-lg font-bold mb-4">Dashboard</h2>
              <div className="border-b border-gray-700 mb-4"></div>

              <ul className="space-y-3">
                {/* If logged in, show expert or admin specific links along with guest links, else only show user/guest links */}

                {/* Common Links */}
                {sidebarTabs["user"].map((tab) => (
                  <li key={tab.path}>
                    <SheetClose asChild>
                      <Link
                        to={tab.path}
                        className="block p-2 rounded hover:bg-gray-700"
                      >
                        {tab.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}

                {/* User Role Specific Links */}
                {user ? (
                  <>
                    {sidebarTabs[user.role].map((tab) => (
                      <li key={tab.path}>
                        <SheetClose asChild>
                          <Link
                            to={tab.path}
                            className="block p-2 rounded hover:bg-gray-700"
                          >
                            {tab.name}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                    <SheetClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full flex items-center"
                        type="button"
                        onClick={handleSignOut}
                      >
                        Logout
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </SheetContent>
          </Sheet>

          {/* Logo & Desktop Links */}
          <img src={EcoMapLogo} alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold hover:text-green-300">
            EcoMap
          </Link>
          <ul className="hidden sm:flex space-x-4">
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

        {/* Login Button */}
        <div>
          <Link
            to={
              user
                ? user.role === "expert"
                  ? "/expert/spottings"
                  : "/admin/experts"
                : "/expert/login"
            }
          >
            <img
              src={AccountLogo}
              alt="Account"
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
