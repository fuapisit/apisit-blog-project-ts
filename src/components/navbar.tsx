import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900 cursor-pointer">
        hh.
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md transition cursor-pointer">
          Log in
        </button>
        <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 hover:shadow-md transition cursor-pointer">
          Sign up
        </button>
      </div>
    </nav>
  );
};



export default NavBar;