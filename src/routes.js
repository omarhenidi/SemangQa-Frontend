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
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlinePieChart className="h-6 w-6" />,
    // component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Task",
    layout: "/admin",
    icon: <MdFileCopy className="h-6 w-6" />,
    path: "data-tables",
    // component: < />,
  },

  {
    name: "Settings",
    layout: "/auth",
    path: "sign-in",
    icon: <MdSettings className="h-6 w-6" />,
    // component: < />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    // component: < />,
  },
];
export default routes;
