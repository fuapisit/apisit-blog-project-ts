import logo from "../assets/hero-image.jpg";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav>
      <div className="w-screen bg-[#46467A] h-[60px] flex justify-between items-center md:h-[80px]">
        <img
          src={logo}
          alt="logo"
          className="w-[40px] h-[40px] m-3 md:w-[60px] md:h-[60px] md:ml-20"
        />
        <div className="md:w-[276px] md:h-[48px] md:mr-25">
          <ul className="hidden md:flex md:justify-between">
            <li>
              <a
                href="/login"
                className="border rounded-full block py-3 text-center w-[127px] h-[48px] leading-6 text-[16px] text-white bg-[#FFC212] hover:bg-[#303055]"
              >
                Log in
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="border rounded-full block py-3 text-center w-[127px] h-[48px] leading-6 text-[16px] bg-white hover:bg-gray-200"
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
        {/* mobile responsive*/}
        <div className="relative md:hidden">
          {/* Hamburger Button */}
          <button
            className="m-5 text-white text-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 right-0 bg-white shadow-lg p-2 w-screen text-center z-50">
              <ul className="flex flex-col space-y-2">
                <li>
                  <a
                    href="/login"
                    className="border rounded-full block p-2 bg-white hover:bg-gray-200"
                  >
                    Log in
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    className="border rounded-full block p-2 text-white bg-[#392346] hover:bg-gray-200"
                  >
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
