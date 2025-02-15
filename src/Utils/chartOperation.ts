import { RatePeriod, SeriesData } from "../Entities/currency";

export const sumInPeriod = (series: SeriesData[]) => {
  const sumInPeriod = series.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  return sumInPeriod;
};

export const formatDateRatePeriod = (
  data: RatePeriod,
  targetCurrency: string
) => {
  const series: SeriesData[] = Object.entries(data.rates).map(
    ([date, rateObj]) => ({
      date: new Date(date).toLocaleString(undefined, {
        year: "2-digit",
        day: "numeric",
        month: "2-digit",
      }),
      price:
        rateObj[targetCurrency] > 1
          ? +rateObj[targetCurrency]
          : +(1 / rateObj[targetCurrency]).toFixed(2),
    })
  );
  return series;
};

export const VariationRate = (series: SeriesData[]) => {
  return +(
    (series[series.length - 1].price / series[series.length - 2].price - 1) *
    100
  ).toFixed(3);
};

export const average = (series: SeriesData[]) => {
  const sumPeriod = sumInPeriod(series);
  const averageInPeriod = +(sumPeriod / series.length).toFixed(3);
  return averageInPeriod;
};

export const minMaxExtractor = (series: SeriesData[]) => {
  const dataPriceArray = series.map((curr) => curr.price);

  const maxPrice = Math.max.apply(null, dataPriceArray);
  const minPrice = Math.min.apply(null, dataPriceArray);

  return { minPrice, maxPrice };
};
