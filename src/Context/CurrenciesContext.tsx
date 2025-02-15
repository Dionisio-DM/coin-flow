import { createContext, ReactNode, useEffect, useState } from "react";
import { currencyApi } from "../Services/currencyApi";
import { RatePeriod, SeriesData } from "../Entities/currency";
import { formatDate, fromDate } from "../Utils/dateOperations";

export interface ContextData {
  baseValue: number;
  targetValue: number;
  updateExchangeInput: (value: React.ChangeEvent<HTMLInputElement>) => void;
  rate: number;
  variationRate: number;
  maxInPeriod: number;
  minInPeriod: number;
  averageInPeriod: number;
  seriesData: SeriesData[];
  getRate: (baseCurrency: string, targetCurrency: string) => Promise<void>;
  getSeriesData: (
    fromDate: string,
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
  const [baseValue, setBaseValue] = useState<number>(0);
  const [targetValue, setTargetValue] = useState<number>(0);

  const [rate, setRate] = useState<number>(1);
  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  const [variationRate, setVariationRate] = useState<number>(0);
  const [averageInPeriod, setAverageInPeriod] = useState<number>(1);
  const [maxInPeriod, setMaxInPeriod] = useState<number>(8);
  const [minInPeriod, setMinInPeriod] = useState<number>(1);

  // Transforma resposta da api response em um array de objetos e modifica variaveis
  const parseRateInPeriodData = (data: RatePeriod) => {
    const series: SeriesData[] = Object.entries(data.rates).map(
      ([date, rateObj]) => ({
        date: new Date(date).toLocaleString(undefined, {
          year: "2-digit",
          day: "numeric",
          month: "2-digit",
        }),
        price: +(1 / rateObj["USD"]).toFixed(2),
      })
    );

    const calculatedVariationRate = +(
      (series[series.length - 1].price / series[series.length - 2].price - 1) *
      100
    ).toFixed(3);

    const sumInPeriod = series.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );

    const averageInPeriod = +(sumInPeriod / series.length).toFixed(3);

    const dataPriceArray = series.map((curr) => curr.price);

    const maxPrice = Math.max.apply(null, dataPriceArray);
    const minPrice = Math.min.apply(null, dataPriceArray);

    setSeriesData(series);
    setVariationRate(calculatedVariationRate);
    setAverageInPeriod(averageInPeriod);
    setMaxInPeriod(maxPrice);
    setMinInPeriod(minPrice);

    return series;
  };

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
      .getRateInPeriod(formatedDate, "BRL", "USD")
      .then(parseRateInPeriodData);
  }, []);

  // adicionar useeffect para inicializar seriesdata, variationrate e averageinperiod

  // Função de atualização de variaveis
  const getRate = async (baseCurrency: string, targetCurrency: string) => {
    currencyApi
      .getRate(baseCurrency, targetCurrency)
      .then((data) => setRate(data.rates[targetCurrency]));
  };

  const getSeriesData = async (
    fromDate: string,
    baseCurrency: string,
    targetCurrency: string
  ) => {
    return currencyApi
      .getRateInPeriod(fromDate, baseCurrency, targetCurrency)
      .then(parseRateInPeriodData);
  };

  const updateExchangeInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +(+value.target.value).toFixed(2);
    if (value.target.id === "base") {
      setBaseValue(+newValue);
      setTargetValue(+(newValue * rate).toFixed(2));
    } else if (value.target.id === "target") {
      setTargetValue(newValue);
      setBaseValue(+(newValue / rate).toFixed(2));
    }
  };

  return (
    <CurrenciesContext.Provider
      value={{
        baseValue,
        targetValue,
        updateExchangeInput,
        rate,
        variationRate,
        averageInPeriod,
        seriesData,
        maxInPeriod,
        minInPeriod,
        getRate,
        getSeriesData,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
};
