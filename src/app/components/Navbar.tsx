import Link from "next/link";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";



export default function Navbar() {

  const darkTheme = true;
  
  const themeHandler = darkTheme ? (
    <MdOutlineDarkMode />
  ) : (
    <MdOutlineLightMode />
  );

  const fontColorClass = darkTheme ? 'darkTheme-font-color darkTheme-icon-hover':'lightTheme-font-color lightTheme-icon-hover'

  return (
    <nav
      className={`nav-container flex justify-between max-w-3xl lg:max-w-6xl mx-auto 
      ${darkTheme
          ? "darkTheme-border darkTheme-font-color"
          : "lightTheme-border lightTheme-font-color"
      }`}
    >
      <section className="grow">
        <div className="nav-searchbar-container flex">
          <Link href="/">
            <AiOutlineHome className={`text-3xl icon-hover darkTheme-font-color ${fontColorClass}`} />
          </Link>

          <AiOutlineSearch className={`text-3xl icon-hover darkTheme-font-color ${fontColorClass}`} />
        </div>
      </section>
      <section className="flex gap-2">
        <button
          
          className={`text-3xl icon-hover darkTheme-font-color ${fontColorClass}`}
        >
          {themeHandler}
        </button>
        <div>
          <BsFillPersonFill className={` text-3xl  rounded-full
          ${darkTheme
            ? " text-[#2f3349] bg-slate-300"
            : " darkTheme-font-color bg-slate-400 hover:text-blue-700"
        } 
          `} />
        </div>
      </section>
    </nav>
  );
}
