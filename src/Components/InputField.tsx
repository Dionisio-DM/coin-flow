import { TextField } from "@radix-ui/themes";
import { CurrencySelector } from "./CurrencySelector";
import { useCurrencies } from "../Hooks/useCurrencies";

interface InputFieldProps {
  initial: string;
  value: number;
  id: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  initial,
  value,
  id,
}) => {
  const { updateExchangeInput } = useCurrencies();
  return (
    <>
      <TextField.Root
        id={id}
        size={"3"}
        value={value === 0 ? "" : value}
        onChange={(e) => {
          updateExchangeInput(e);
        }}
      >
        <TextField.Slot side="right">
          <CurrencySelector initial={initial} />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
};
