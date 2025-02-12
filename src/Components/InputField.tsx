import { Button, DropdownMenu, TextField } from "@radix-ui/themes";

export const InputField: React.FC = () => {
  return (
    <>
      <TextField.Root size={"3"}>
        <TextField.Slot side="right">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" color="gray">
                BRL
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="1">
              <DropdownMenu.Item>USD</DropdownMenu.Item>
              <DropdownMenu.Item>EUR</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </TextField.Slot>
      </TextField.Root>
    </>
  );
};
