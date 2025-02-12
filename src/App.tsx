import { Box, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ConverterCard } from "./Components/ConverterCard";

function App() {
  return (
    <Theme appearance="dark">
      <Box maxWidth={"80rem"} maxHeight={"100vh"} mx={"auto"}>
        <Header />
        <Box mt={"5"}>
          <ConverterCard></ConverterCard>
        </Box>
        <Footer />
      </Box>
    </Theme>
  );
}

export default App;
