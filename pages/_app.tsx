import "../styles/styles.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StyledEngineProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StyledEngineProvider>
  );
}

export default MyApp;
