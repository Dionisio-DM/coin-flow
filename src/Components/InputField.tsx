import { TextField } from "@radix-ui/themes";
import { CurrencySelector } from "./CurrencySelector";
import { useCurrencies } from "../Hooks/useCurrencies";

interface InputFieldProps {
  currency: string;
  value: number;
  id: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  currency,
  value,
  id,
}) => {
  const { updateExchangeInput } = useCurrencies();

  const changeHandle = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +(+value.target.value).toFixed(2);
    const id: string = value.target.id;
    updateExchangeInput(newValue, id);
  };

  return (
    <>
      <TextField.Root
        id={id}
        size={"3"}
        value={value === 0 ? "" : value}
        onChange={(e) => {
          changeHandle(e);
        }}
      >
        <TextField.Slot side="right">
          <CurrencySelector currency={currency} id={id} />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
};
