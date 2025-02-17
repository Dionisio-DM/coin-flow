import { createContext, ReactNode, useEffect, useState } from "react";
import { RatePeriod, SeriesData } from "../Entities/currency";
import { formatDate, fromDate } from "../Utils/dateOperations";
import { currencyApi } from "../Services/currencyApi";
import {
  average,
  formatDateRatePeriod,
  minMaxExtractor,
  VariationRate,
} from "../Utils/chartOperation";

interface ChartContextData {
  segmentedControlValue: string;
  updateSegmentedControlValue: (value: string) => void;
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

export const ChartContext = createContext({} as ChartContextData);

interface ChartContextProviderProps {
  children: ReactNode;
}

export const ChartContextProvider: React.FC<ChartContextProviderProps> = ({
  children,
}) => {
  const [segmentedControlValue, setSegmentedControlValue] =
    useState<string>("month");

  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  const [variationRate, setVariationRate] = useState<number>(0);
  const [averageInPeriod, setAverageInPeriod] = useState<number>(1);
  const [maxInPeriod, setMaxInPeriod] = useState<number>(8);
  const [minInPeriod, setMinInPeriod] = useState<number>(1);

  // função reutilizável para atualizar campos relevantes
  const updateChartContext = (data: RatePeriod, targetCurrency: string) => {
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
  };

  // Inicialização gráfico, variação diária e média no período
  useEffect(() => {
    const date = fromDate(1);
    const formatedDate = formatDate(date);
    currencyApi.getRateInPeriod(formatedDate, "BRL", "USD").then((data) => {
      return updateChartContext(data, "USD");
    });
  }, []);

  // atualiza valor do segmentedControlValue (encapsulado na função para caso tenha necessidade de regras extras antes de atualizar  futuramente)
  const updateSegmentedControlValue = (value: string) => {
    setSegmentedControlValue(value);
  };

  // Requisita novos dados para a api para atualizar interface
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
        return updateChartContext(data, targetCurrency);
      });
  };

  return (
    <ChartContext.Provider
      value={{
        segmentedControlValue,
        updateSegmentedControlValue,
        variationRate,
        averageInPeriod,
        seriesData,
        maxInPeriod,
        minInPeriod,
        getSeriesData,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
