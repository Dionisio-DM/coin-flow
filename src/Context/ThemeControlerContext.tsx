import { createContext, ReactNode, useState } from "react";

interface ThemeContextData {
  appearance: "light" | "dark" | "inherit" | undefined;
  toggleTheme: () => void;
}

export const ThemeControlerContext = createContext({} as ThemeContextData);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [appearance, setAppearance] = useState<
    "light" | "dark" | "inherit" | undefined
  >("dark");

  const toggleTheme = () => {
    setAppearance((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeControlerContext.Provider value={{ appearance, toggleTheme }}>
      {children}
    </ThemeControlerContext.Provider>
  );
};
