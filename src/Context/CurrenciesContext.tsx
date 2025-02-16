import { createContext, ReactNode, useEffect, useState } from "react";
import { currencyApi } from "../Services/currencyApi";
import { SeriesData } from "../Entities/currency";
import { formatDate, fromDate } from "../Utils/dateOperations";
import {
  formatDateRatePeriod,
  VariationRate,
  average,
  minMaxExtractor,
} from "../Utils/chartOperation";

export interface ContextData {
  baseCurrency: string;
  targetCurrency: string;
  updateCurrenciesContext: (newCurrency: string, id: string) => void;
  currencies: string[];
  baseValue: number;
  targetValue: number;
  updateExchangeInput: (value: number, id: string) => void;
  rate: number;
  variationRate: number;
  maxInPeriod: number;
  minInPeriod: number;
  averageInPeriod: number;
  seriesData: SeriesData[];
  getSeriesData: (
    months: number,
    baseCurrency: string,
    targetCurrency: string
  ) => Promise<SeriesData[]>;
}

export const CurrenciesContext = createContext({} as ContextData);

interface CurrenciesContextProviderProps {
  children: ReactNode;
}

export const CurrenciesContextProvider: React.FC<
  CurrenciesContextProviderProps
> = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState<string>("BRL");
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");

  const [baseValue, setBaseValue] = useState<number>(0);
  const [targetValue, setTargetValue] = useState<number>(0);

  const [currencies, setCurrencies] = useState<string[]>([]);

  const [rate, setRate] = useState<number>(1);

  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  const [variationRate, setVariationRate] = useState<number>(0);
  const [averageInPeriod, setAverageInPeriod] = useState<number>(1);
  const [maxInPeriod, setMaxInPeriod] = useState<number>(8);
  const [minInPeriod, setMinInPeriod] = useState<number>(1);

  // Inicializando variaveis
  useEffect(() => {
    currencyApi
      .getRate("BRL", "USD")
      .then((data) => setRate(data.rates["USD"]));
  }, []);

  useEffect(() => {
    const date = fromDate(1);
    const formatedDate = formatDate(date);
    currencyApi
      .getRateInPeriod(formatedDate, baseCurrency, targetCurrency)
      .then((data) => {
        const series = formatDateRatePeriod(data, targetCurrency);
        const calculatedVariationRate = VariationRate(series);
        const averageInPeriod = average(series);

        const { minPrice, maxPrice } = minMaxExtractor(series);
        setSeriesData(series);
        setVariationRate(calculatedVariationRate);
        setAverageInPeriod(averageInPeriod);
        setMaxInPeriod(maxPrice);
        setMinInPeriod(minPrice);
      });
  }, []);

  useEffect(() => {
    currencyApi.getCurrenciesName().then((data) => {
      setCurrencies(Object.keys(data));
    });
  }, []);

  // Reagindo a mudanças
  useEffect(() => {
    setTargetValue(+(baseValue * rate).toFixed(2));
  }, [rate]);

  // useEffect(()=>setAverageInPeriod())

  // Função de atualização de variaveis
  const getRate = async (baseCurrency: string, targetCurrency: string) => {
    currencyApi
      .getRate(baseCurrency, targetCurrency)
      .then((data) => setRate(data.rates[targetCurrency]));
  };

  const getSeriesData = async (
    months: number,
    baseCurrency: string,
    targetCurrency: string
  ) => {
    const date = fromDate(months);
    const formatedFromDate = formatDate(date);

    return currencyApi
      .getRateInPeriod(formatedFromDate, baseCurrency, targetCurrency)
      .then((data) => {
        const series = formatDateRatePeriod(data, targetCurrency);
        const calculatedVariationRate = VariationRate(series);
        const averageInPeriod = average(series);
        const { minPrice, maxPrice } = minMaxExtractor(series);
        setSeriesData(series);
        setVariationRate(calculatedVariationRate);
        setAverageInPeriod(averageInPeriod);
        setMaxInPeriod(maxPrice);
        setMinInPeriod(minPrice);
        return series;
      });
  };

  const updateCurrenciesContext = (newCurrency: string, id: string) => {
    if (id === "base") {
      setBaseCurrency(newCurrency);
      getRate(newCurrency, targetCurrency);
      getSeriesData(1, newCurrency, targetCurrency);
    } else if (id === "target") {
      setTargetCurrency(newCurrency);
      getRate(baseCurrency, newCurrency);
      console.log(seriesData);
      getSeriesData(1, baseCurrency, newCurrency);
    }
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
        baseCurrency,
        targetCurrency,
        updateCurrenciesContext,
        currencies,
        baseValue,
        targetValue,
        updateExchangeInput,
        rate,
        variationRate,
        averageInPeriod,
        seriesData,
        maxInPeriod,
        minInPeriod,
        getSeriesData,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
};
