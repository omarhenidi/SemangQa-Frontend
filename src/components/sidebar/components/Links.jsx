import React from "react";
import { Link, useLocation } from "react-router-dom";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path} className="no-underline">
            <div className="relative flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8 "
                key={index}
              >
                <span
                  className={`pb-2 ${activeRoute(route.path) === true
                    ? "font-bold text-customYellow"
                    : "font-medium text-gray-400"
                    }`}
                >
                  {route.icon}
                </span>
                <p
                  className={`leading-1 ml-4 pt-2 ${activeRoute(route.path) === true
                    ? "font-bold text-customYellow "
                    : "font-medium text-gray-400"
                    }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div class="absolute mt-6 h-1 w-1 ml-4 bg-customYellow" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
