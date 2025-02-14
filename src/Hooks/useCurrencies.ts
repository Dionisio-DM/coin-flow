import { useContext } from "react";
import { CurrenciesContext } from "../Context/CurrenciesContext";

export const useCurrencies = () => {
  return useContext(CurrenciesContext);
};
