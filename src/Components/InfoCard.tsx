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
          <Text align={"center"} weight={"bold"} size={"5"}>
            {title}
          </Text>
          <Text align={"center"}>{content}</Text>
        </Flex>
      </Card>
    </Box>
  );
};
