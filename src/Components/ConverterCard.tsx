import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { InputField } from "./InputField";
import { useCurrencies } from "../Hooks/useCurrencies";

export const ConverterCard: React.FC = () => {
  const { baseValue, targetValue } = useCurrencies();
  return (
    <Card>
      <Box>
        <Flex
          gap={"3"}
          direction={"row"}
          width={"100%"}
          justify={"between"}
          wrap={"wrap"}
        >
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Quantia
            </Text>
            <InputField initial="BRL" value={baseValue} id="base"></InputField>
          </Box>
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Converter para
            </Text>
            <InputField
              initial="USD"
              value={targetValue}
              id="target"
            ></InputField>
          </Box>
        </Flex>
        <Text as="p" mt={"1rem"}>
          Valor convertido
        </Text>
      </Box>
    </Card>
  );
};
