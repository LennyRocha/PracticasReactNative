import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";

const lightTheme = {
  background: "#ffffff",
  textColor: "#000000",
  buttonBackground: "#4CAF50",
  buttonText: "#ffffff",
  headerBack: "#2196F3",
  card: "#F5F5F5",
  selections: "#FFC107",
  drawerBack: "#FFFFFF",
};

const darkTheme = {
  background: "#121212",
  textColor: "#ffffff",
  buttonBackground: "#388E3C",
  buttonText: "#E0E0E0",
  headerBack: "#1976D2",
  card: "#1E1E1E",
  selections: "#FFA000",
  drawerBack: "#1E1E1E",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    const listener = ({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    };
    const subscription = Appearance.addChangeListener(listener);
    
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);