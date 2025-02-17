import { useContext } from "react";
import { ThemeControlerContext } from "../Context/ThemeControlerContext";

export const useTheme = () => {
  return useContext(ThemeControlerContext);
};
