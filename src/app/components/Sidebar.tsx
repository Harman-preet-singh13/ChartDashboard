
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import logo from "../favicon.ico";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useThemeContext } from "../customHook/themeHook";

type sidebarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>

}

export default function Sidebar({isOpen, setIsOpen}:sidebarProps) {
  
  const darkTheme = true;

  function handleClick() {
    setIsOpen((prev) => !prev);
  }


  const MenuBtn = isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />;

  const ThemeFontColorHandler = darkTheme ? 'darkTheme-hover-aside-icon darkTheme-font-color':'lightTheme-hover-aside-icon darkTheme-font-color';
  const fontColorClassName = darkTheme ? 'darkTheme-font-color' : 'lightTheme-font-color';

  return (
    <aside className="">
      <div className=" items-center">
        <div
          className={`h-16 flex ${
            isOpen
              ? "bg-[#2f3349] border-r border-[#D0D4F180] sidebar-header"
              : ""
          }`}
        >
          <button
            onClick={handleClick}
            className={`toggle-button text-3xl icon-hover self-center ${fontColorClassName}`}
          >
            {MenuBtn}
          </button>
          <Link href="/">
            <img src={logo.src} className=" w-12 h-12 mt-2" alt="LogoIcon" />
          </Link>
        </div>

        <ul
          id="primary-navigation"
          className={`primary-navigation 
           flex border-r border-[#D0D4F180]
          ${isOpen && "active"} 
          `}
        >
          <li>
            <Link className={`hover-aside-icon ${ThemeFontColorHandler}`} onClick={handleClick} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={`hover-aside-icon ${ThemeFontColorHandler}`} onClick={handleClick} href="/filterData">
              FilterData
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
