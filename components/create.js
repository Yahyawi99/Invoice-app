import createStyles from "../styles/create.module.css";
import { useGlobal } from "../context";
import Calender from "./calendar";

const Create = () => {
  const {
    createMode,
    error,
    addItem,
    submitForm,
    emailError,
    showCalendar,
    setShowCalendar,
    info,
    setInfo,
    dropDown,
    setDropDown,
    saveAsDraft,
    discard,
    getPaymentTime,
    editMode,
    saveChanges,
    cancelEditing,
  } = useGlobal();

  return (
    <article
      className={`${createMode && createStyles.show} ${createStyles.container}`}
    >
      {info.id ? (
        <h1 style={{ fontWeight: 600 }} className={createStyles.title}>
          Edit <span>#</span>
          {info.id}
        </h1>
      ) : (
        <h1 className={createStyles.title}>New Invoice </h1>
      )}

      <form
        className={createStyles.formContainer}
        onSubmit={(e) => submitForm(e, info)}
        noValidate
        autoComplete="off"
      >
        <section className={createStyles.form}>
          <p>Bill From</p>
          <div className="fromAddressContainer">
            <label htmlFor="fromAddress">Street Address</label>
            <input
              type="text"
              name="fromAddress"
              value={info.senderAddress.street}
              onChange={(e) =>
                setInfo({
                  ...info,
                  senderAddress: {
                    ...info.senderAddress,
                    street: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className={createStyles.info}>
            <div className="fromCityContainer">
              <label htmlFor="fromCity">City</label>
              <input
                type="text"
                name="fromCity"
                value={info.senderAddress.city}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    senderAddress: {
                      ...info.senderAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="fromPostCodeContainer">
              <label htmlFor="fromPostCode">Post Code</label>
              <input
                type="text"
                name="fromPostCode"
                value={info.senderAddress.postCode}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    senderAddress: {
                      ...info.senderAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="fromCountryContainer">
              <label htmlFor="fromCountry">Country</label>
              <input
                type="text"
                name="fromCountry"
                value={info.senderAddress.country}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    senderAddress: {
                      ...info.senderAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className={createStyles.form}>
          <p>Bill To</p>
          <div className="clientNameContainer">
            <label htmlFor="clientName">Client&apos;s Name</label>
            <input
              type="text"
              name="clientName"
              value={info.clientName}
              onChange={(e) => setInfo({ ...info, clientName: e.target.value })}
            />
          </div>

          <div className={createStyles.clientEmailContainer}>
            <label htmlFor="clientEmail">Client&apos;s Email</label>
            <input
              type="email"
              name="clientEmail"
              data-status="Not Ok"
              value={info.clientEmail}
              onChange={(e) =>
                setInfo({ ...info, clientEmail: e.target.value })
              }
            />
            {emailError && <span>Invalid Email</span>}
          </div>

          <div className="toAddressContainer">
            <label htmlFor="toAddress">Street Address</label>
            <input
              type="text"
              name="toAddress"
              value={info.clientAddress.street}
              onChange={(e) =>
                setInfo({
                  ...info,
                  clientAddress: {
                    ...info.clientAddress,
                    street: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className={createStyles.info}>
            <div className="toCityContainer">
              <label htmlFor="toCity">City</label>
              <input
                type="text"
                name="toCity"
                value={info.clientAddress.city}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    clientAddress: {
                      ...info.clientAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="toPostCodeContainer">
              <label htmlFor="toPostCode">Post Code</label>
              <input
                type="text"
                name="toPostCode"
                value={info.clientAddress.postCode}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    clientAddress: {
                      ...info.clientAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="toCountryContainer">
              <label htmlFor="toCountry">Country</label>
              <input
                type="text"
                name="toCountry"
                value={info.clientAddress.country}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    clientAddress: {
                      ...info.clientAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className={createStyles.payment}>
            <div className="dateContainer">
              <label htmlFor="date">Invoice Date</label>
              <input
                type="text"
                name="date"
                value={info.createdAt}
                onClick={() => {
                  setDropDown(false);
                  setShowCalendar(!showCalendar);
                }}
                readOnly
              />
              <i
                onClick={() => {
                  setDropDown(false);
                  setShowCalendar(!showCalendar);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
                </svg>
              </i>
              {showCalendar && <Calender />}
            </div>

            <div className="termsContainer">
              <label htmlFor="terms">Payment Terms</label>
              <input
                type="text"
                name="terms"
                value={`Next ${info.paymentTerms} Day`}
                onClick={() => {
                  setDropDown(!dropDown);
                  setShowCalendar(false);
                }}
                readOnly
              />
              <i
                onClick={() => {
                  setDropDown(!dropDown);
                  setShowCalendar(false);
                }}
              >
                <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1l4.228 4.228L9.456 1"
                    stroke="var(--a)"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </i>
              {dropDown && (
                <ul className={createStyles.dropDown}>
                  <li
                    value={1}
                    onClick={(e) => getPaymentTime(e.currentTarget.value)}
                  >
                    Next 1 Day
                  </li>
                  <li
                    value={5}
                    onClick={(e) => getPaymentTime(e.currentTarget.value)}
                  >
                    Next 5 Day
                  </li>
                  <li
                    value={10}
                    onClick={(e) => getPaymentTime(e.currentTarget.value)}
                  >
                    Next 10 Day
                  </li>
                  <li
                    value={20}
                    onClick={(e) => getPaymentTime(e.currentTarget.value)}
                  >
                    Next 20 Day
                  </li>
                  <li
                    value={30}
                    onClick={(e) => getPaymentTime(e.currentTarget.value)}
                  >
                    Next 30 Day
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="descriptionContainer">
            <label htmlFor="description">Project Description</label>
            <input
              type="text"
              name="description"
              value={info.description}
              onChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
            />
          </div>
        </section>

        <section className={createStyles.form}>
          <p>Item List</p>

          {info.items.map((e, i) => {
            const { name, quantity, price, total } = e;
            return (
              <div key={i} className={createStyles.itemInfo}>
                <div className="nameContainer">
                  <label htmlFor="itemName">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={name}
                    onChange={(e) => {
                      const newItems = info.items.map((elem, index) => {
                        if (index == i) {
                          elem.name = e.target.value;
                        }
                        return elem;
                      });
                      setInfo({ ...info, items: newItems });
                    }}
                  />
                </div>

                <div className="quantityContaier">
                  <label htmlFor="quantity">Qty.</label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => {
                      const newItems = info.items.map((elem, index) => {
                        if (index == i) {
                          elem.quantity = e.target.value;
                        }
                        return elem;
                      });
                      setInfo({ ...info, items: newItems });
                    }}
                  />
                </div>

                <div className="priceContainer">
                  <label htmlFor="itemPrice">Price</label>
                  <input
                    type="number"
                    name="itemPrice"
                    value={price}
                    onChange={(e) => {
                      const newItems = info.items.map((elem, index) => {
                        if (index == i) {
                          elem.price = e.target.value;
                        }
                        return elem;
                      });
                      setInfo({ ...info, items: newItems });
                    }}
                  />
                </div>

                <div className={createStyles.totalContainer}>
                  <label htmlFor="total">Total</label>
                  <input
                    type="text"
                    name="total"
                    value={`£${(price * quantity).toFixed(2)}`}
                    readOnly
                  />
                </div>
                {i > 0 && (
                  <div
                    className="bin"
                    onClick={() => {
                      const newItems = info.items.filter((elem) => elem != e);
                      setInfo({ ...info, items: newItems });
                    }}
                  >
                    <svg
                      width="13"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                        fill="#888EB0"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className={createStyles.addBtn}
            onClick={() => addItem(info, setInfo)}
          >
            <div>
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
            </div>

            <p>Add New Item</p>
          </button>
        </section>

        {error && (
          <p className={createStyles.errorMsg}> - All fields must be added</p>
        )}

        <div className={createStyles.btns}>
          {editMode ? (
            <div className={createStyles.editBtns}>
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
              <button type="button" onClick={() => saveChanges(info.id)}>
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <button
                className={createStyles.discardBtn}
                type="button"
                onClick={discard}
              >
                Discard
              </button>

              <div>
                <button
                  className={createStyles.draftBtn}
                  type="button"
                  onClick={() => saveAsDraft(info)}
                >
                  Save as Draft
                </button>
                <button className={createStyles.sendBtn} type="submit">
                  Save and Send
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </article>
  );
};

export default Create;
