import { Button, DropdownMenu } from "@radix-ui/themes";
import { useCurrencies } from "../Hooks/useCurrencies";

interface CurrencySelectorProps {
  currency: string;
  id: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  id,
}) => {
  const { currencies, baseCurrency, targetCurrency, updateCurrenciesContext } =
    useCurrencies();

  const handleSelect = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const targetValue = target.dataset.value;
    const targetId = target.id;

    console.log(targetId);

    targetValue && updateCurrenciesContext(targetValue, targetId);
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
        {currencies.map((currency) => {
          if (currency !== baseCurrency && currency !== targetCurrency)
            return (
              <DropdownMenu.Item
                key={currency}
                id={id}
                data-value={currency}
                onSelect={handleSelect}
              >
                {currency}
              </DropdownMenu.Item>
            );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
