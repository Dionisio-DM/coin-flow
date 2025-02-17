import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CurrenciesContextProvider } from "./Context/CurrenciesContext.tsx";
import { ChartContextProvider } from "./Context/ChartContext.tsx";
import { ThemeContextProvider } from "./Context/ThemeControlerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <CurrenciesContextProvider>
      <ChartContextProvider>
        <App />
      </ChartContextProvider>
    </CurrenciesContextProvider>
  </ThemeContextProvider>
);
