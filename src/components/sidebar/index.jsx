import React, { Component } from "react";
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";
import Logo from "assets/images/logo.png"
import { Link, useLocation } from "react-router-dom";

// Icon Imports
import {
  MdOutlineLogout
} from "react-icons/md";

class Sidebar extends Component {
  componentDidMount() {
    const user = this.props.user;
  }
  logout = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page
  };
  render() {
    const { open, onClose, user } = this.props;

    return (
      <div
        className={`sm:none rounded-3xl duration-175 linear fixed !z-50 flex min-h-full flex-col pb-10 shadow-2xl shadow-white/5 transition-all  md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
          }`}
        style={{ backgroundColor: "black", width: "213px" }}
      >
        <span
          className="absolute top-4 right-4 block cursor-pointer xl:hidden text-white"
          onClick={onClose}
        >
          <HiX />
        </span>

        <div className={`mx-[30px] mt-[50px] flex items-center`}>
          <div className="mt-1 ml-8 h-2.5 font-poppins text-[18px] font-bold uppercase text-white">
            SemangQa
          </div>
        </div>

        <div className="mt-[58px] mb-7" />
        <div className="flex justify-center items-center ml-5 text-center">
          <img src={Logo} alt="Logo" />
        </div>


        <div className="items-center ml-5 mt-2 text-center">
          <h5>  {user && (
            <div className="text-[18px] font-bold uppercase text-white text-center">
              {user.name}
            </div>
          )}</h5>
          <h6 className="text-gray-400 text-[16px]">Graphic Designer</h6>
        </div>

        {/* Nav item */}
        <ul className="mb-auto pt-1">
          <Links routes={routes} />
        </ul>


        <Link className="no-underline" onClick={this.logout} >
          <div className="mb-1 flex hover:cursor-pointer no-underline">
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
            >
              <span className="leading-1 ml-7 flex font-bold text-gray-400 text-md">
                <MdOutlineLogout className="h-6 w-6" />
              </span>
              <span
                className="ml-3 flex text-gray-400"
              >
                Logout
              </span>
            </li>

          </div>
        </Link>
        {/* Nav item end */}
      </div>
    );
  }
}

export default Sidebar;
