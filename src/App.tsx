import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { AuthWrapper } from "./contexts/AuthContext";
import "./App.css";
import i18n from "./i18n";
import { createContext, useMemo, useState } from "react";
import CartProvider from "./contexts/CartContext";

type ThemeContextType = {
  switchColorMode: () => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => {},
});
function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <CartProvider>
      <StyledEngineProvider injectFirst>
        <ThemeContext.Provider value={{ switchColorMode }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthWrapper>
              <I18nextProvider i18n={i18n}>
                <RouterProvider router={router} />
              </I18nextProvider>
            </AuthWrapper>
          </ThemeProvider>
        </ThemeContext.Provider>
      </StyledEngineProvider>
    </CartProvider>
  );
}
export default App;
