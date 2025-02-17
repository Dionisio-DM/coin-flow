import { createContext, ReactNode, useEffect, useState } from "react";
import { currencyApi } from "../Services/currencyApi";
import { CurrencyNames } from "../Entities/currency";

interface ContextData {
  currencyNames: CurrencyNames;
  baseCurrency: string;
  targetCurrency: string;
  updateBaseCurrency: (value: string) => void;
  updateTargetCurrency: (value: string) => void;
  currencies: string[];
  baseValue: number;
  targetValue: number;
  updateExchangeInput: (value: number, id: string) => void;
  rate: number;
  getRate: (baseCurrency: string, targetCurrency: string) => Promise<void>;
}

export const CurrenciesContext = createContext({} as ContextData);

interface CurrenciesContextProviderProps {
  children: ReactNode;
}

export const CurrenciesContextProvider: React.FC<
  CurrenciesContextProviderProps
> = ({ children }) => {
  const [currencyNames, setCurrencyNames] = useState<CurrencyNames>({});

  const [baseCurrency, setBaseCurrency] = useState<string>("BRL");
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");

  const [baseValue, setBaseValue] = useState<number>(0);
  const [targetValue, setTargetValue] = useState<number>(0);

  const [currencies, setCurrencies] = useState<string[]>([]);

  const [rate, setRate] = useState<number>(1);

  // Inicializando variaveis
  useEffect(() => {
    currencyApi
      .getRate("BRL", "USD")
      .then((data) => setRate(data.rates["USD"]));
  }, []);

  useEffect(() => {
    currencyApi.getCurrenciesName().then((data) => {
      setCurrencyNames(data);
      setCurrencies(Object.keys(data));
    });
  }, []);

  // Reagindo a mudanças
  useEffect(() => {
    setTargetValue(+(baseValue * rate).toFixed(2));
  }, [rate]);

  // Função de atualização de variaveis
  const getRate = async (baseCurrency: string, targetCurrency: string) => {
    currencyApi
      .getRate(baseCurrency, targetCurrency)
      .then((data) => setRate(data.rates[targetCurrency]));
  };

  const updateBaseCurrency = (value: string) => {
    setBaseCurrency(value);
  };
  const updateTargetCurrency = (value: string) => {
    setTargetCurrency(value);
  };

  const updateExchangeInput = (value: number, id: string) => {
    if (id === "base") {
      setBaseValue(+value);
      setTargetValue(+(value * rate).toFixed(2));
    } else if (id === "target") {
      setTargetValue(value);
      setBaseValue(+(value / rate).toFixed(2));
    }
  };

  return (
    <CurrenciesContext.Provider
      value={{
        currencyNames,
        baseCurrency,
        targetCurrency,
        updateBaseCurrency,
        updateTargetCurrency,
        currencies,
        baseValue,
        targetValue,
        updateExchangeInput,
        rate,
        getRate,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
};
