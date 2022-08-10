import invoicesStyles from "../styles/invoices.module.css";
import { useGlobal } from "../context";
import Link from "next/link";

const Invoices = () => {
  const { data, statusStyles, formatDate, setShowFilter, setFilter } =
    useGlobal();
  return data.map((invoice) => {
    const { id, paymentDue, clientName, status, total } = invoice;

    return (
      <Link key={id} href={"/invoice/[id]"} as={`/invoice/${id}`} passHref>
        <section
          className={invoicesStyles.invoice}
          onClick={() => {
            setShowFilter(false);
            setFilter(["draft", "paid", "pending"]);
          }}
        >
          <div className={invoicesStyles.info}>
            <div className={invoicesStyles.id}>
              <span>#</span>
              <p>{id}</p>
            </div>

            <p className={invoicesStyles.paymentTime}>
              Due {formatDate(paymentDue)}
            </p>
            <p className={invoicesStyles.clientName}>{clientName}</p>
          </div>

          <div className={invoicesStyles.payment}>
            <p className={invoicesStyles.price}>
              £{total.toLocaleString("en-US")}
            </p>
            <div className={invoicesStyles.status} style={statusStyles(status)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
              </svg>
              <p>{status.charAt(0).toUpperCase() + status.substring(1)}</p>
            </div>
            <svg
              className={invoicesStyles.arrow}
              width="7"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l4 4-4 4"
                stroke="#7C5DFA"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </section>
      </Link>
    );
  });
};

export default Invoices;
