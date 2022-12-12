import "../styles/styles.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import Layout from "../components/layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StyledEngineProvider>
      <Provider store={store}>
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </Provider>
    </StyledEngineProvider>
  );
}

export default MyApp;
