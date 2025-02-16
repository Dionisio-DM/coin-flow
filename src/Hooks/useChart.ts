import { useContext } from "react";
import { ChartContext } from "../Context/ChartContext";

export const useChart = () => {
  return useContext(ChartContext);
};
