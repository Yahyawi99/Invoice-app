/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from "react";
import Data from "../data.json";

const AppContext = React.createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState(Data);
  const [dataTwo, setDataTwo] = useState(Data);
  const [showFilter, setShowFilter] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const [filter, setFilter] = useState(["draft", "paid", "pending"]);
  const refFilterBtn = useRef(null);
  const [deleteOn, setDeleteOn] = useState(false);
  const [error, setError] = useState(false);
  const [myStyles, setMyStyles] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [myMonth, setMyMonth] = useState(null);
  const [days, setDays] = useState([]);
  const [today, setToday] = useState(new Date().getDate());
  const [createMode, setCreateMode] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [info, setInfo] = useState({
    id: "",
    createdAt: new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
    }).format(new Date(`${year},${month},${today}`)),
    paymentDue: new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
    }).format(new Date(new Date().getTime() + 24 * 3600 * 1000)),
    description: "",
    paymentTerms: 1,
    clientName: "",
    clientEmail: "",
    status: "pending",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: "1",
        price: "99",
        total: "99.00",
      },
    ],
    total: "99.00",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (darkmode) {
      setMyStyles({
        "--main-back-clr": "#141625",
        "--back-clr": "#1e2139",
        "--back-clr-2": "#dfe3fa",
        "--back-clr-3": "#252945",
        "--back-clr-4": "#141625",
        "--txt-clr": "#FFF",
        "--txt-clr-2": "#7e88c3",
        "--txt-clr-3": "#888eb0",
        "--red": "#ec5757",
      });
    } else {
      setMyStyles({
        "--main-back-clr": "#f9fafe",
        "--back-clr": "#FFF",
        "--back-clr-2": "#dfe3fa",
        "--back-clr-3": "#252945",
        "--back-clr-4": "#FFF",
        "--txt-clr": "#000",
        "--txt-clr-2": "#777f98",
        "--txt-clr-3": "#888eb0",
        "--red": "#ec5757",
      });
    }
  }, [darkmode]);

  const statusStyles = (status) => {
    let styles = {};
    if (status === "pending") {
      styles = {
        color: "var(--s)",
        fill: "var(--s)",
        background: "var(--ss)",
      };
    } else if (status === "draft") {
      styles = {
        color: "#000",
        fill: "#000",
        background: "var(--yy)",
      };
    } else {
      styles = {
        color: "var(--r)",
        fill: "var(--r)",
        background: "var(--rr)",
      };
    }
    return styles;
  };

  // Filter functionality
  const checkBox = (state, e) => {
    const filterOption = e.nextSibling;
    const filterTxt = e.dataset.id;

    if (state) {
      filterOption.style.color = "var(--txt-clr)";
      filterOption.style.textDecoration = "none";
      if (!filter.includes(filterTxt)) {
        setFilter([...filter, filterTxt]);
      }
    } else {
      filterOption.style.color = "grey";
      filterOption.style.textDecoration = "line-through";
      if (filter.includes(filterTxt)) {
        setFilter((prev) => prev.filter((e) => e !== filterTxt));
      }
    }
  };

  const filterFunc = () => {};

  useEffect(() => {
    setData(() => {
      return dataTwo.filter((invoice) => filter.includes(invoice.status));
    });
  }, [filter]);

  useEffect(() => {
    if (createMode || deleteOn) {
      window.scrollTo({
        top: 0,
      });
      window.document.body.style.overflowY = "hidden";
    } else {
      window.document.body.style.overflowY = "visible";
    }
  }, [createMode, deleteOn]);

  const formatDate = (time) => {
    const date = new Date(time);
    const MyDate = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    const theDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
    }).format(MyDate);

    return theDate;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const IdGenerator = () => {
    const Alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "W",
      "X",
      "Y",
      "Z",
    ];

    let myId = "";

    for (let i = 0; i < 2; i++) {
      let rndNum = Math.floor(Math.random() * 9) + 1;
      myId += Alphabet[rndNum];
    }

    for (let j = 0; j < 4; j++) {
      let rndNum = Math.floor(Math.random() * 9) + 1;
      myId += rndNum;
    }

    return myId;
  };

  // Calendar
  const nextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
  };
  const prevMonth = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setMonth(12);
      setYear(year - 1);
    }
  };
  useEffect(() => {
    const MyDate = new Date(`${year},${month}`);
    setMyMonth(formatDate(MyDate).match(/[a-z]+/gi));
  }, [month, year]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= getDaysInMonth(year, month); i++) {
      if (!arr.includes(i)) {
        arr.push(i);
      }
    }
    setDays(arr);

    // Update the createdAt time in the info Object above
    setInfo({
      ...info,
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
    });
  }, [month, today]);
  /**********/

  const emailValidator = (input) => {
    const email = input.value;
    const regex = /^[a-z]{3,}\d*@[a-z]+.[a-z]+$/gi;
    const result = regex.test(email);
    return result;
  };

  const calculateTotal = (arr) => {
    arr.items.forEach((e) => (e.total = parseInt(e.price * e.quantity)));

    const Total = arr.items.reduce((total, curr) => {
      return total + curr.total;
    }, 0);

    arr.total = Total;
  };

  const clearInputBorder = () => {
    const Form = document.getElementsByTagName("form");
    const Inputs = Form[0].getElementsByTagName("input");

    [...Inputs].forEach((e) => {
      e.style.borderColor = "rgba(128, 128, 128, 0.5)";
    });
  };

  const getPaymentTime = (term = 1) => {
    const creationTime = new Date(info.createdAt).getTime();
    const paymentTerms = term * 24 * 3600 * 1000;

    const paymentTime = creationTime + paymentTerms;

    setInfo({
      ...info,
      paymentTerms: term,
      paymentDue: formatDate(paymentTime),
    });

    setDropDown(false);
  };
  useEffect(() => {
    getPaymentTime();
  }, [info.createdAt]);

  const markAs = (id, status) => {
    switch (status) {
      case "pending":
        setData((value) => {
          return value.map((e) => {
            if (e.id == id) {
              e.status = "paid";
            }
            return e;
          });
        });
        break;
      case "draft":
        setData((value) => {
          return value.map((e) => {
            if (e.id == id) {
              e.status = "pending";
            }
            return e;
          });
        });
        break;

      default:
        console.log("invalid status");
        break;
    }
  };

  const deleteInvoice = (id) => {
    setData((value) => {
      return value.filter((e) => e.id != id);
    });

    setDataTwo((value) => {
      return value.filter((e) => e.id != id);
    });
  };

  const addItem = (info, setInfo) => {
    setInfo({
      ...info,
      items: [
        ...info.items,
        {
          name: "",
          quantity: "",
          price: "",
          total: "",
        },
      ],
    });
  };

  // create new invoice
  const submitForm = (e) => {
    e.preventDefault();

    const Inputs = e.currentTarget.getElementsByTagName("input");

    const emailInput = [...Inputs].find((e) => e.name == "clientEmail");

    [...Inputs].forEach((e) => {
      if (e.value) {
        e.dataset.status = "Ok";
        e.style.borderColor = "rgba(128, 128, 128, 0.5)";
      } else {
        e.dataset.status = "Not Ok";
        e.style.borderColor = "var(--red)";
      }
    });

    if (emailValidator(emailInput)) {
      emailInput.dataset.status = "Ok";
      emailInput.style.borderColor = "rgba(128, 128, 128, 0.5)";
      setEmailError(false);
    } else {
      emailInput.dataset.status = "Not Ok";
      emailInput.style.borderColor = "var(--red)";
      setEmailError(true);
    }

    const allFull = [...Inputs].every((e) => e.dataset.status == "Ok");

    if (allFull) {
      setEmailError(false);
      setError(false);

      clearInputBorder();

      addInvoice(info);
    } else {
      setError(true);
    }
  };

  const addInvoice = (invoice) => {
    invoice.id = IdGenerator();

    calculateTotal(invoice);

    setDataTwo([...dataTwo, invoice]);
    setData([...data, invoice]);

    setCreateMode(false);

    setInfo({
      id: "",
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
      paymentDue: new Date(),
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "1",
          price: "99",
          total: "",
        },
      ],
      total: "99.00",
    });

    setFilter(["draft", "paid", "pending"]);
  };

  // set invoice as a draft
  const saveAsDraft = (invoice) => {
    invoice.status = "draft";
    invoice.id = IdGenerator();

    setDataTwo([...dataTwo, invoice]);
    setData([...data, invoice]);

    setCreateMode(false);

    clearInputBorder();

    setInfo({
      id: "",
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
      paymentDue: new Date(),
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "1",
          price: "99",
          total: "",
        },
      ],
      total: "99.00",
    });

    setFilter(["draft", "paid", "pending"]);
  };

  // discard invoice
  const discard = () => {
    setCreateMode(false);
    setEmailError(false);
    setShowCalendar(false);
    setError(false);

    clearInputBorder();

    setInfo({
      id: "",
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
      paymentDue: new Date(),
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "1",
          price: "99",
          total: "",
        },
      ],
      total: "99.00",
    });
  };

  // Edit invooce
  const editInvoice = (id, invoice) => {
    setEditMode(true);

    setInfo({ ...invoice, createdAt: formatDate(invoice.createdAt) });

    setCreateMode(true);
  };

  const saveChanges = (id) => {
    calculateTotal(info);

    setData((value) => {
      return value.map((e) => {
        if (e.id == id) {
          return info;
        } else {
          return e;
        }
      });
    });

    setDataTwo((value) => {
      return value.map((e) => {
        if (e.id == id) {
          return info;
        } else {
          return e;
        }
      });
    });

    setCreateMode(false);

    setInfo({
      id: "",
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
      paymentDue: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(new Date().getTime() + 24 * 3600 * 1000)),
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "1",
          price: "99",
          total: "99.00",
        },
      ],
      total: "99.00",
    });

    setEditMode(false);
  };

  const cancelEditing = () => {
    setCreateMode(false);

    clearInputBorder();

    setInfo({
      id: "",
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(`${year},${month},${today}`)),
      paymentDue: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(new Date(new Date().getTime() + 24 * 3600 * 1000)),
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "1",
          price: "99",
          total: "99.00",
        },
      ],
      total: "99.00",
    });

    setEditMode(false);
  };

  return (
    <AppContext.Provider
      value={{
        statusStyles,
        showFilter,
        setShowFilter,
        setFilter,
        darkmode,
        setDarkmode,
        checkBox,
        data,
        refFilterBtn,
        formatDate,
        createMode,
        setCreateMode,
        info,
        setInfo,
        deleteOn,
        setDeleteOn,
        markAs,
        deleteInvoice,
        error,
        setError,
        addInvoice,
        saveAsDraft,
        myStyles,
        addItem,
        submitForm,
        emailError,
        nextMonth,
        prevMonth,
        myMonth,
        year,
        days,
        today,
        setToday,
        showCalendar,
        setShowCalendar,
        setEmailError,
        dropDown,
        setDropDown,
        filterFunc,
        discard,
        getPaymentTime,
        editInvoice,
        editMode,
        saveChanges,
        cancelEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(AppContext);
};

export default Provider;
