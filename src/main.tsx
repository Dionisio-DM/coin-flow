import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CurrenciesContextProvider } from "./Context/CurrenciesContext.tsx";
import { ChartContextProvider } from "./Context/ChartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrenciesContextProvider>
      <ChartContextProvider>
        <App />
      </ChartContextProvider>
    </CurrenciesContextProvider>
  </StrictMode>
);
