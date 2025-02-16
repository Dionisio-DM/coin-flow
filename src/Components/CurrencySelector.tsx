import { Button, DropdownMenu } from "@radix-ui/themes";
import { useCurrencies } from "../Hooks/useCurrencies";
import CurrencyFlag from "react-currency-flags";
import { useChart } from "../Hooks/useChart";

interface CurrencySelectorProps {
  currency: string;
  id: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  id,
}) => {
  const {
    currencies,
    baseCurrency,
    targetCurrency,
    updateBaseCurrency,
    updateTargetCurrency,
    getRate,
  } = useCurrencies();

  const { updateSegmentedControlValue, getSeriesData } = useChart();

  const handleSelect = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const targetValue = target.dataset.value ? target.dataset.value : "";
    const targetId = target.id;

    if (targetId === "base") {
      updateBaseCurrency(targetValue);
      getRate(targetValue, targetCurrency);
      getSeriesData(1, targetValue, targetCurrency);
    } else if (targetId === "target") {
      updateTargetCurrency(targetValue);
      getRate(baseCurrency, targetValue);
      getSeriesData(1, baseCurrency, targetValue);
    }

    updateSegmentedControlValue("month");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" size={"3"} asChild>
          <a href="#">
            <CurrencyFlag currency={currency} size="md" />
            {currency}
            <DropdownMenu.TriggerIcon />
          </a>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        {currencies.map((currency) => {
          if (currency !== baseCurrency && currency !== targetCurrency)
            return (
              <DropdownMenu.Item
                key={currency}
                id={id}
                data-value={currency}
                onSelect={handleSelect}
              >
                <CurrencyFlag currency={currency} size="md" />
                {currency}
              </DropdownMenu.Item>
            );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
