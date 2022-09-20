import "../styles/globals.css";
import "antd/dist/antd.css";
import Layout from "../Utils/Components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
