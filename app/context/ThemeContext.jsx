import { useState, createContext, useContext } from "react";
import { Appearance } from "react-native";

import { Colors } from "@/constants/Colors";

const ThemeContext = createContext("light");

const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? Colors.dark : Colors.light
  );
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
