import { createBrowserRouter } from "react-router-dom";
import { AppLoginScreen } from "./Login";
import { AppDashbaordRootScreen } from "./Dashbaord";
import { AppAdminUserScreen } from "./AdminUsers";
import { AppAdminJobsRootScreen } from "./AdminJobs";
import { AppAdminCreateJobScreen } from "./AdminCreateJob";
import { AppAdminSMSListByScreen } from "./AdminSmsListByJob";
import { AppSignupScreen } from "./Signup";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLoginScreen />,
  },
  {
    path: "/signup",
    element: <AppSignupScreen />,
  },
  {
    path: "/dashboard",
    element: <AppDashbaordRootScreen />,
  },
  {
    path: "/dashbaord-users",
    element: <AppAdminUserScreen />,
  },
  {
    path: "/dashbaord-create-cron-job",
    element: <AppAdminCreateJobScreen />,
  },
  {
    path: "/dashbaord-sms-list-by-cron-job/:jobId",
    element: <AppAdminSMSListByScreen />,
  },
  {
    path: "/dashbaord-jobs",
    element: <AppAdminJobsRootScreen />,
  },
]);
