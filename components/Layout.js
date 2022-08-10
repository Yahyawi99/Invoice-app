import layoutStyles from "../styles/layout.module.css";
import { useGlobal } from "../context";
import Sidebar from "./Sidebar";
import Create from "./create";
import DeleteModal from "./deleteModal";

const Layout = ({ children }) => {
  const { deleteOn, myStyles } = useGlobal();

  return (
    <main style={myStyles} className={layoutStyles.appContainer}>
      <Sidebar />
      <section className={layoutStyles.invoice}>
        {children}
        <Create />
        {deleteOn && <DeleteModal />}
      </section>
    </main>
  );
};

export default Layout;
