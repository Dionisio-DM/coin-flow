import { useContext } from "react";
import { ThemeControllerContext } from "../Context/ThemeControllerContext";

export const useTheme = () => {
  return useContext(ThemeControllerContext);
};
