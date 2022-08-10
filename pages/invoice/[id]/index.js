import React from "react";
// CSS
import invoiceStyles from "../../../styles/invoice.module.css";
import { useRouter } from "next/router";
import { useGlobal } from "../../../context";
import Link from "next/link";

const Invoice = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, statusStyles, formatDate, setDeleteOn, markAs, editInvoice } =
    useGlobal();

  const myData = data.filter((e) => e.id == id);

  return myData.map((e) => {
    const {
      id,
      status,
      description,
      senderAddress,
      clientAddress,
      createdAt,
      paymentDue,
      items,
      total,
      clientName,
      clientEmail,
    } = e;

    return (
      <article key={id} className={invoiceStyles.container}>
        <Link href={"/"} passHref>
          <button className={invoiceStyles.goBackBtn}>
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.342.886L2.114 5.114l4.228 4.228"
                stroke="#9277FF"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
            <p>Go back</p>
          </button>
        </Link>

        <header className={invoiceStyles.header}>
          <div className={invoiceStyles.status}>
            <p>status</p>
            <div style={statusStyles(status)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
              </svg>
              <p>{status}</p>
            </div>
          </div>

          <div className={invoiceStyles.btns}>
            <button onClick={() => editInvoice(id, e)}>edit</button>
            <button onClick={() => setDeleteOn(true)}>delete</button>
            {status !== "paid" && (
              <button
                onClick={() => markAs(id, status)}
                className={invoiceStyles.markAsBtn}
              >
                {status === "pending" ? "Mark as Paid" : "Mark as Pending"}
              </button>
            )}
          </div>
        </header>

        <section className={invoiceStyles.details}>
          <div>
            <div>
              <p className={invoiceStyles.id}>
                <span>#</span>
                {id || "__"}
              </p>
              <p className={invoiceStyles.description}>{description || "__"}</p>
            </div>

            <div className={invoiceStyles.address}>
              <p>{senderAddress.street || "__"}</p>
              <p>{senderAddress.city || "__"}</p>
              <p>{senderAddress.postCode || "__"}</p>
              <p>{senderAddress.country || "__"}</p>
            </div>
          </div>

          <div>
            <div>
              <div>
                <p>Invoice Date</p>
                <p className={invoiceStyles.invoiceDate}>
                  {formatDate(createdAt) || "__"}
                </p>
              </div>

              <div>
                <p>Payment Due</p>
                <p className={invoiceStyles.paymentDate}>
                  {formatDate(paymentDue) || "__"}
                </p>
              </div>
            </div>

            <div>
              <p>Bill to</p>
              <p className={invoiceStyles.clientName}>{clientName}</p>
              <span className={invoiceStyles.clientAddress}>
                <p>{clientAddress.street || "__"}</p>
                <p>{clientAddress.city || "__"}</p>
                <p>{clientAddress.podtCode || "__"}</p>
                <p>{clientAddress.country || "__"}</p>
              </span>
            </div>

            <div>
              <p>Sent To</p>
              <p className={invoiceStyles.sentTo}>{clientEmail || "__"}</p>
            </div>
          </div>

          <footer className={invoiceStyles.footer}>
            <div className={invoiceStyles.itemsRow}>
              <div>
                <div>
                  <p>Item Name</p>
                </div>

                <div className={invoiceStyles.secondColumn}>
                  <span>
                    <p>QTY.</p>
                  </span>
                  <span>
                    <p>Price</p>
                  </span>
                  <span>
                    <p>Total</p>
                  </span>
                </div>
              </div>

              {items.map((item, i) => {
                const { name, quantity, price, total } = item;

                return (
                  <div className={invoiceStyles.item} key={i}>
                    <span>
                      <p className={invoiceStyles.itemName}>{name || "__"}</p>
                    </span>

                    <div className={invoiceStyles.secondColumn}>
                      <span>
                        <p className={invoiceStyles.quantity}>
                          {quantity || "__"}
                        </p>
                      </span>
                      <span>
                        <p className={invoiceStyles.price}>£{price || "__"}</p>
                      </span>
                      <span>
                        <p className={invoiceStyles.total}>£{total || "__"}</p>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="amountRow">
              <p className={invoiceStyles.amountTitle}>Amount Due</p>
              <p className={invoiceStyles.amount}>
                £{total.toLocaleString("en-US") || "__"}
              </p>
            </div>
          </footer>
        </section>
      </article>
    );
  });
};

export default Invoice;
