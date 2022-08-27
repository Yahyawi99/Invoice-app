import Head from "next/head";
// CSS
import homeStyles from "../styles/home.module.css";
// useContext
import { useGlobal } from "../context";
// Components
import Header from "../components/header";
import Invoices from "../components/invoices";
import EmptyMsg from "../components/emptyMsg";

const Home = () => {
  const { data } = useGlobal();

  return (
    <>
      <Head>
        <title>Invoice App</title>
      </Head>

      <article className={homeStyles.homeContainer}>
        <Header />

        {data.length ? <Invoices /> : <EmptyMsg />}
      </article>
    </>
  );
};

export default Home;
