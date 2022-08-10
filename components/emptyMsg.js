import emptyStyles from "../styles/empty.module.css";
import Image from "next/image";

const EmptyMsg = () => {
  return (
    <section className={emptyStyles.container}>
      <div className={emptyStyles.imgContainer}>
        <Image
          src={"/images/illustration-empty.svg"}
          width="100%"
          height="100%"
          layout="responsive"
          alt="No-invoices"
        />
      </div>

      <p className={emptyStyles.message}>There is nothing here</p>

      <p className={emptyStyles.hint}>
        create an invoice by clicking the <span>New Invoice</span> button and
        get started
      </p>
    </section>
  );
};

export default EmptyMsg;
