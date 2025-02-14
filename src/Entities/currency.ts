export interface Rate {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface RatePeriod {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

export interface SeriesData {
  date: string;
  price: number;
}
