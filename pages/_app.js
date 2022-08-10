// CSS
import "../styles/globals.css";
// Layout
import Layout from "../components/Layout";
// Context
import Provider from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
