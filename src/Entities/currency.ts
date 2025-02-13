export interface Rate {
  amount: number;
  base: string;
  date: string;
  rates: {};
}

export interface RatePeriod {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {};
}
