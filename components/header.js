import headerStyles from "../styles/header.module.css";
import { useGlobal } from "../context";

const Header = () => {
  const { showFilter, setShowFilter, checkBox, refFilterBtn, setCreateMode } =
    useGlobal();

  return (
    <header className={headerStyles.header}>
      <section className={headerStyles.title}>
        <h2>Invoices</h2>
        <p className="total">There are 7 total invoices</p>
      </section>

      <section className={headerStyles.filterAndButton}>
        <p
          className={headerStyles.filterBtn}
          onClick={(e) => setShowFilter(!showFilter)}
        >
          Filter by status
          <span>
            <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1l4.228 4.228L9.456 1"
                stroke="#7C5DFA"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </p>
        {showFilter && (
          <div ref={refFilterBtn} className={headerStyles.filter}>
            <div>
              <input
                onClick={(e) =>
                  checkBox(e.currentTarget.checked, e.currentTarget)
                }
                data-id="draft"
                type="checkbox"
                defaultChecked
              />
              <p>Draft</p>
            </div>

            <div>
              <input
                onClick={(e) =>
                  checkBox(e.currentTarget.checked, e.currentTarget)
                }
                data-id="pending"
                type="checkbox"
                defaultChecked
              />
              <p>Pending</p>
            </div>

            <div>
              <input
                onClick={(e) =>
                  checkBox(e.currentTarget.checked, e.currentTarget)
                }
                data-id="paid"
                type="checkbox"
                defaultChecked
              />
              <p>Paid</p>
            </div>
          </div>
        )}

        <button
          data-id="open"
          type="button"
          onClick={(e) => {
            if (e.target.dataset.id === "open") {
              setCreateMode(true);
            }
            setShowFilter(false);
          }}
        >
          <div data-id="open">
            <svg
              data-id="open"
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                data-id="open"
                d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                fill="#7C5DFA"
                fillRule="nonzero"
              />
            </svg>
          </div>

          <p data-id="open">New Invoice</p>
        </button>
      </section>
    </header>
  );
};

export default Header;
