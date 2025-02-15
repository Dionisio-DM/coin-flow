import { Box, Card, Flex, Text } from "@radix-ui/themes";

interface InfoCardProps {
  title: string;
  content: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <Box maxWidth="100%" flexGrow={"1"}>
      <Card>
        <Flex direction={"column"}>
          <Text align={"center"} weight={"bold"} size={"7"}>
            {title}
          </Text>
          <Text align={"center"} size={"7"} weight={"light"}>
            {content}
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};
