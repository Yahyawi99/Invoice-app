import calenderStyles from "../styles/calender.module.css";
import { useGlobal } from "../context";

const Calender = () => {
  const { nextMonth, prevMonth, myMonth, year, days, today, setToday } =
    useGlobal();
  return (
    <article className={calenderStyles.calender}>
      <section>
        <svg
          className={calenderStyles.arrows}
          width="7"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          onClick={prevMonth}
        >
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>

        <p>
          {myMonth} {year}
        </p>

        <svg
          className={calenderStyles.arrows}
          width="7"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          onClick={nextMonth}
        >
          <path
            d="M1 1l4 4-4 4"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </section>

      <section>
        {days.map((day) => {
          return (
            <span
              key={day}
              className={`${today == day && calenderStyles.clicked} ${
                calenderStyles.days
              }`}
              onClick={() => setToday(day)}
            >
              <p>{day}</p>
            </span>
          );
        })}
      </section>
    </article>
  );
};

export default Calender;
