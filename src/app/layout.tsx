"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {  useState } from "react";
import {  useThemeContext, ThemeProvider } from "./customHook/themeHook";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false);
  
  const {darkTheme} = useThemeContext();

  

  return (
   
    <html lang="en">
      
      <body className={`${inter.className} ${darkTheme ? 'light-mode':'dark-mode'}`}>
        
        <div className="main-flex-container">
          <div className="main-flex-item1">
            <div className="">
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
          </div>
          <div className="main-flex-item2 w-screen ml-24">
            <div className={`${isOpen ? 'opacity-50 blur-md':''}`}>
              <Navbar />
               {children}
            </div>
          </div>
          
        </div>
        
      </body>
    
    </html>
 
  );
}
