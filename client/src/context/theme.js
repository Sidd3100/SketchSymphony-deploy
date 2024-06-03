import { createContext,useContext } from "react";

export const ThemeContext = createContext({
    themeMode : "light",
    lightTheme :()=>{},
    darkTheme :()=>{}, 	
})