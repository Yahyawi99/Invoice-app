import React from "react";
import deleteModalStyles from "../styles/deleteModal.module.css";
import { useGlobal } from "../context";
import { useRouter } from "next/router";
import Link from "next/link";

const DeleteModal = () => {
  const { setDeleteOn, deleteInvoice } = useGlobal();

  const {
    query: { id },
  } = useRouter();

  return (
    <section className={deleteModalStyles.container}>
      <div className={deleteModalStyles.modal}>
        <h1>Confirm Deletion</h1>
        <p>
          Are you sure you want to delete invoice RT3080? This action cannot be
          undone.
        </p>
        <div className={deleteModalStyles.btns}>
          <button
            className={deleteModalStyles.cancel}
            onClick={() => setDeleteOn(false)}
          >
            Cancel
          </button>

          <Link href="/" passHref>
            <button
              className={deleteModalStyles.delete}
              onClick={() => {
                deleteInvoice(id);
                setDeleteOn(false);
              }}
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
