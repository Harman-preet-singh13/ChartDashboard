import { createContext, useContext, useState, ReactNode } from "react";

interface themeContextType{
    darkTheme: boolean;
    toggleDarkTheme: () => void;
}

const themeContext = createContext<themeContextType>({
    darkTheme: false, 
    toggleDarkTheme: () => {},
  });

export function useThemeContext(){

    const context = useContext(themeContext);

    
    return context;
}


export function ThemeProvider({children}: {children:ReactNode}) {

    const [darkTheme, setDarkTheme] = useState(true);

    const toggleDarkTheme = () => {
        setDarkTheme(prev => !prev);
    };

    return (
        <themeContext.Provider value={{darkTheme, toggleDarkTheme}}>
            {children}
        </themeContext.Provider>
    )
}