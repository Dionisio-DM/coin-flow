import { TextField } from "@radix-ui/themes";
import { CurrencySelector } from "./CurrencySelector";
import { useCurrencies } from "../Hooks/useCurrencies";
import { filterAllowedCharacters } from "../Utils/checkOperations";

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
    const checkedValue = filterAllowedCharacters(value.target.value);
    const newValue = +(+checkedValue).toFixed(2);
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
