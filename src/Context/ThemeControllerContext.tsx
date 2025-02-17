import { createContext, ReactNode, useState } from "react";

interface ThemeContextData {
  appearance: "light" | "dark" | "inherit" | undefined;
  toggleTheme: () => void;
}

export const ThemeControllerContext = createContext({} as ThemeContextData);

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
    <ThemeControllerContext.Provider value={{ appearance, toggleTheme }}>
      {children}
    </ThemeControllerContext.Provider>
  );
};
