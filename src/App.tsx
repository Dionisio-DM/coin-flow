import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ConverterCard } from "./Components/ConverterCard";
import { ChartCard } from "./Components/ChartCard";

function App() {
  return (
    <Theme appearance="dark">
      <Box maxWidth={"80rem"} maxHeight={"100vh"} mx={"auto"}>
        <Header />
        <Box mt={"5"}>
          <Box my={"0.85rem"}>
            <ConverterCard></ConverterCard>
          </Box>
          <Box my={"0.85rem"}>
            <ChartCard></ChartCard>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Theme>
  );
}

export default App;
