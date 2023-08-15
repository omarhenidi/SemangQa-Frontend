import React from "react";

// Admin Imports
import MainDashboard from "views/dashboard";

// Icon Imports
import {
  MdHome,
  MdOutlinePieChart,
  MdFileCopy,
  MdPerson,
  MdSettings
} from "react-icons/md";

const routes = [
  {
    name: "Home ",
    layout: "/admin",
    path: "/adminn",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "",
    icon: <MdOutlinePieChart className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Task",
    layout: "/admin",
    icon: <MdFileCopy className="h-6 w-6" />,
    // component: < />,
  },

  {
    name: "Settings",
    layout: "/auth",
    icon: <MdSettings className="h-6 w-6" />,
    // component: < />,
  },
  {
    name: "Profile",
    layout: "/admin",
    icon: <MdPerson className="h-6 w-6" />,
    // component: < />,
  },
];
export default routes;
