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
  const currencyNames = {
    AUD: "Dólar Australiano",
    BGN: "Lev Búlgaro",
    BRL: "Real Brasileiro",
    CAD: "Dólar Canadense",
    CHF: "Franco Suíço",
    CNY: "Yuan Chinês",
    CZK: "Coroa Tcheca",
    DKK: "Coroa Dinamarquesa",
    EUR: "Euro",
    GBP: "Libra Esterlina",
    HKD: "Dólar de Hong Kong",
    HUF: "Forint Húngaro",
    IDR: "Rupia Indonésia",
    ILS: "Novo Shekel Israelense",
    INR: "Rúpia Indiana",
    ISK: "Coroa Islandesa",
    JPY: "Iene Japonês",
    KRW: "Won Sul-Coreano",
    MXN: "Peso Mexicano",
    MYR: "Ringgit Malaio",
    NOK: "Coroa Norueguesa",
    NZD: "Dólar Neozelandês",
    PHP: "Peso Filipino",
    PLN: "Złoty Polonês",
    RON: "Leu Romeno",
    SEK: "Coroa Sueca",
    SGD: "Dólar de Singapura",
    THB: "Baht Tailandês",
    TRY: "Lira Turca",
    USD: "Dólar Americano",
    ZAR: "Rand Sul-Africano",
  };

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
      .then((data) => setRate(data.rates["USD"] / 10000000000));
  }, []);

  // Inicializando variaveis
  useEffect(() => {
    currencyApi.getCurrenciesName().then((data) => {
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
      .then((data) => setRate(data.rates[targetCurrency] / 10000000000));
  };

  // Atualiza baseCurrency. Encapsulada em caso de necessidade futura
  const updateBaseCurrency = (value: string) => {
    setBaseCurrency(value);
  };

  // Atualiza baseCurrency. Encapsulada em caso de necessidade futura
  const updateTargetCurrency = (value: string) => {
    setTargetCurrency(value);
  };

  // Atualização condicional das variáveis set e base currency
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
