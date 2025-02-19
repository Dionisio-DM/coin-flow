import { Box, Flex, IconButton, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ConverterCard } from "./Components/ConverterCard";
import { ChartCard } from "./Components/ChartCard";
import { InfoCard } from "./Components/InfoCard";
import { useCurrencies } from "./Hooks/useCurrencies";
import { useChart } from "./Hooks/useChart";
import { useTheme } from "./Hooks/useThemeController";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

function App() {
  const { rate, targetCurrency, baseCurrency } = useCurrencies();
  const { averageInPeriod, variationRate } = useChart();
  const { appearance, toggleTheme } = useTheme();

  return (
    <Theme appearance={appearance} accentColor="indigo" radius="large">
      <Box maxWidth={"80rem"} mx={"auto"} pt={"1"}>
        <Flex justify={"between"}>
          <Box>
            <Header />
          </Box>
          <IconButton onClick={toggleTheme} variant="ghost" size={"4"}>
            {appearance === "light" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Flex>
      </Box>
      <Box maxWidth={"80rem"} maxHeight={"100vh"} mx={"auto"}>
        <Flex
          direction={"column"}
          style={{
            minHeight: "100vh",
            maxWidth: "80rem",
            margin: "0 auto",
          }}
        >
          <Flex
            direction="column"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Box mt={"5"}>
              <Box my={"0.85rem"}>
                <ConverterCard />
              </Box>
              <Box my={"0.85rem"}>
                <ChartCard />
              </Box>
              <Flex wrap={"wrap"} justify={"between"} gap={"4"}>
                <InfoCard
                  title="Taxa Atual"
                  content={
                    rate <= 1
                      ? `1000 ${baseCurrency} = ${(1000 * rate).toFixed(
                          3
                        )} ${targetCurrency}`
                      : `1 ${baseCurrency} = ${rate.toFixed(
                          3
                        )} ${targetCurrency}`
                  }
                ></InfoCard>
                <InfoCard
                  title="Variação Diária"
                  content={`${variationRate}%`}
                ></InfoCard>
                <InfoCard
                  title="Média do Período"
                  content={
                    rate <= 1
                      ? `${averageInPeriod} ${baseCurrency} = 1 ${targetCurrency}`
                      : `${averageInPeriod} ${targetCurrency} = 1 ${baseCurrency}`
                  }
                ></InfoCard>
              </Flex>
            </Box>
          </Flex>
          <Box mt="4rem" mb={"1.5rem"}>
            <Footer />
          </Box>
        </Flex>
      </Box>
    </Theme>
  );
}

export default App;
