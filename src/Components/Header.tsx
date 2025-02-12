import { Heading } from "@radix-ui/themes";

export const Header: React.FC = () => {
  return (
    <>
      <Heading as="h1" size={"7"}>
        CoinFlow
      </Heading>
      <Heading as="h2" weight={"light"} size={"5"}>
        Converta valores e acompanhe o histórico de taxas
      </Heading>
    </>
  );
};
