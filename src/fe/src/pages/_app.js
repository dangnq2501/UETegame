import "../styles/globals.css";
import Layout from "../components/layout/layout";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useRouter } from "next/router";

// import { store } from '../src/redux/store';
// import { Provider } from 'react-redux';

import Head from "next/head";

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log('test env: ', process.env.NEXT_PUBLIC_BACKEND_URI)

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logouet.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logouet.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logouet.png" />
      </Head>
      <StyledEngineProvider injectFirst>
        {router.pathname.startsWith("/game/") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default MyApp;
