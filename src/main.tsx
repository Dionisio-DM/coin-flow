import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CurrenciesContextProvider } from "./Context/CurrenciesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrenciesContextProvider>
      <App />
    </CurrenciesContextProvider>
  </StrictMode>
);
