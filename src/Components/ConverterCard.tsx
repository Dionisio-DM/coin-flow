import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { InputField } from "./InputField";

export const ConverterCard: React.FC = () => {
  return (
    <Card>
      <Box>
        <Flex gap={"3"} direction={"row"} width={"100%"} justify={"between"}>
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Quantia
            </Text>
            <InputField></InputField>
          </Box>
          <Box width={"35rem"}>
            <Text as="label" size={"1"}>
              Converter para
            </Text>
            <InputField></InputField>
          </Box>
        </Flex>
        <Text as="p" mt={"1rem"}>
          Valor convertido
        </Text>
      </Box>
    </Card>
  );
};
