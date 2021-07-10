import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../resources/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
