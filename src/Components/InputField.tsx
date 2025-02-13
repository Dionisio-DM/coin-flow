import { TextField } from "@radix-ui/themes";
import { CurrencySelector } from "./CurrencySelector";

export const InputField: React.FC = () => {
  return (
    <>
      <TextField.Root size={"3"}>
        <TextField.Slot side="right">
          <CurrencySelector />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
};
