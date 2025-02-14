import { Box, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ConverterCard } from "./Components/ConverterCard";
import { ChartCard } from "./Components/ChartCard";
import { InfoCard } from "./Components/InfoCard";
import { CurrenciesContextProvider } from "./Context/CurrenciesContext";

function App() {
  return (
    <Theme appearance="dark">
      <CurrenciesContextProvider>
        <Box maxWidth={"80rem"} maxHeight={"100vh"} mx={"auto"}>
          <Header />
          <Box mt={"5"}>
            <Box my={"0.85rem"}>
              <ConverterCard></ConverterCard>
            </Box>
            <Box my={"0.85rem"}>
              <ChartCard></ChartCard>
            </Box>
            <Flex wrap={"wrap"} justify={"between"} gap={"4"}>
              <InfoCard title="Taxa Atual" content="conteudo"></InfoCard>
              <InfoCard title="Taxa Atual" content="conteudo"></InfoCard>
              <InfoCard title="Taxa Atual" content="conteudo"></InfoCard>
            </Flex>
          </Box>
          <Box my={"3rem"} pb={"6"}>
            <Footer />
          </Box>
        </Box>
      </CurrenciesContextProvider>
    </Theme>
  );
}

export default App;
