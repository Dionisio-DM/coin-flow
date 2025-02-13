import { TextField } from "@radix-ui/themes";
import { CurrencySelector } from "./CurrencySelector";

interface InputFieldProps {
  initial: string;
}

export const InputField: React.FC<InputFieldProps> = ({ initial }) => {
  return (
    <>
      <TextField.Root size={"3"}>
        <TextField.Slot side="right">
          <CurrencySelector initial={initial} />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
};
