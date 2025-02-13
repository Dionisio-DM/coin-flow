import { Button, DropdownMenu } from "@radix-ui/themes";
import { useState } from "react";

interface CurrencySelectorProps {
  initial: string;
}

const currencies = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  initial,
}) => {
  const [currency, setCurrency] = useState(initial);

  const handleSelect = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const targetValue = target.dataset.value;
    if (targetValue) setCurrency(targetValue);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" size={"3"}>
          {currency}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        {currencies.map((curr) => {
          if (curr !== currency)
            return (
              <DropdownMenu.Item
                key={curr}
                data-value={curr}
                onSelect={handleSelect}
              >
                {curr}
              </DropdownMenu.Item>
            );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
