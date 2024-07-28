import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard.jsx";
import Product from "../dashboard/Product";
import Sales from "../dashboard/Sales";
import WeeklyLog from "../dashboard/WeeklyLog.jsx";
import MonthlyLog from "../dashboard/MonthlyLog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/product",
        element: <Product />
      },
      {
        path: "/sales",
        element: <Sales />
      },
      {
        path: "/weeklyLog",
        element: <WeeklyLog />
      },
      {
        path: "/monthlyLog",
        element: <MonthlyLog/>
      },
    ]
  },
]);

export default router;
