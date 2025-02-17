import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { InputField } from "./InputField";
import { useCurrencies } from "../Hooks/useCurrencies";

export const ConverterCard: React.FC = () => {
  const { baseValue, targetValue, targetCurrency, baseCurrency } =
    useCurrencies();
  return (
    <Card>
      <Box>
        <Flex
          gap={"3"}
          direction={"row"}
          width={"100%"}
          justify={"between"}
          wrap={"wrap"}
          pb={"0.5rem"}
        >
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Quantia
            </Text>
            <InputField
              currency={baseCurrency}
              value={baseValue}
              id="base"
            ></InputField>
          </Box>
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Converter para
            </Text>
            <InputField
              currency={targetCurrency}
              value={targetValue}
              id="target"
            ></InputField>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};
