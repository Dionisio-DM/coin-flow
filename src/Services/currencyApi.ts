import { CurrencyNames, Rate, RatePeriod } from "../Entities/currency";

export const currencyApi = {
  async getRate(baseCurrency: string, targetCurrency: string): Promise<Rate> {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${targetCurrency}&amount=10000000000`
    );
    const data = await response.json();
    return data;
  },
  async getRateInPeriod(
    fromDate: string,
    baseCurrency: string,
    targetCurrency: string
  ): Promise<RatePeriod> {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/${fromDate}..?symbols=${targetCurrency}&base=${baseCurrency}&amount=10000000000`
    );
    const data = await response.json();
    return data;
  },
  async getCurrenciesName(): Promise<CurrencyNames> {
    const response = await fetch("https://api.frankfurter.dev/v1/currencies");
    const data = await response.json();
    return data;
  },
};
