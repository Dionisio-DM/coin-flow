import { Box, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ConverterCard } from "./Components/ConverterCard";
import { ChartCard } from "./Components/ChartCard";
import { InfoCard } from "./Components/InfoCard";
import { useCurrencies } from "./Hooks/useCurrencies";
import { ChartContextProvider } from "./Context/ChartContext";

function App() {
  const { rate, averageInPeriod, variationRate, targetCurrency, baseCurrency } =
    useCurrencies();

  return (
    <Theme appearance="dark">
      <Box maxWidth={"80rem"} maxHeight={"100vh"} mx={"auto"}>
        <Header />
        <ChartContextProvider>
          <Box mt={"5"}>
            <Box my={"0.85rem"}>
              <ConverterCard></ConverterCard>
            </Box>
            <Box my={"0.85rem"}>
              <ChartCard></ChartCard>
            </Box>
            <Flex wrap={"wrap"} justify={"between"} gap={"4"}>
              <InfoCard
                title="Taxa Atual"
                content={
                  rate <= 1
                    ? `1 ${baseCurrency} = ${rate.toFixed(3)} ${targetCurrency}`
                    : `1000 ${targetCurrency} = ${(1000 / rate).toFixed(3)}`
                }
              ></InfoCard>
              <InfoCard
                title="Variação Diária"
                content={`${variationRate}%`}
              ></InfoCard>
              <InfoCard
                title="Média do Período"
                content={`${averageInPeriod} ${baseCurrency}`}
              ></InfoCard>
            </Flex>
          </Box>
        </ChartContextProvider>
        <Box my={"3rem"} pb={"6"}>
          <Footer />
        </Box>
      </Box>
    </Theme>
  );
}

export default App;
