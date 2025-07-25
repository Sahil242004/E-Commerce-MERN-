import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import ShopContext from "../context/ShopContext";

const NavBar = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartItemsCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  let [visible, setVisible] = useState(false);
  let handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium]">
      <img src={assets.logo} className="w-36 " />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <Link to={"/login"}>
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          </Link>
          {/* ----------------------drop down menu----------------------- */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartItemsCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(!visible)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* side bar menu for small screen  */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={handleClick} to="/" className="border p-4 px-8">
            Home
          </NavLink>
          <NavLink
            onClick={handleClick}
            to="/collections"
            className="border p-4 px-8"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={handleClick}
            to="/about"
            className="border p-4 px-8"
          >
            About
          </NavLink>
          <NavLink
            onClick={handleClick}
            to="/contact"
            className="border p-4 px-8"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
