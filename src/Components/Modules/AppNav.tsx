import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Providers/Auth";

export const AppNavBar: React.FC = () => {
  const { isAuth } = useAuthContext();
  return (
    <React.Fragment>
      <nav className="w-full top-0 sticky bg-white px-2 py-2 shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to={"/"}>
                  <span className="text-lg font-semibold">[Logo]</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-4 flex space-x-3 items-center md:ml-6">
                  {isAuth ? (
                    <React.Fragment>
                      <Link
                        to={"/dashbaord-users"}
                        className="text-lg font-bold  text-slate-700 hover:text-slate-900"
                      >
                        Users
                      </Link>
                      <Link
                        to={"/dashbaord-jobs"}
                        className="text-lg font-bold  text-slate-700 hover:text-slate-900"
                      >
                        Cron Jobs
                      </Link>
                      <Link
                        to={"/dashbaord-create-cron-job"}
                        className="text-lg font-bold  text-slate-700 hover:text-slate-900"
                      >
                        Make Corn Job
                      </Link>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Link
                        to={"/"}
                        className="text-lg font-bold  text-slate-700 hover:text-slate-900"
                      >
                        Login
                      </Link>
                      <Link
                        to={"/signup"}
                        className="text-lg font-bold  text-slate-700 hover:text-slate-900"
                      >
                        Signup
                      </Link>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
