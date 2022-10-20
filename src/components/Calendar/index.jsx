import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import classNames from "classnames";
import PropTypes from "prop-types";

import {
  selectReminders,
  setSelectedDate,
  setSelectedRemindner,
  setToggleModal,
  setYearAndMonth,
} from "../../redux/reminderSlice";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions,
} from "../../utils/helpers";
import Button from "../Button";

CalendarPage.propTypes = {
  renderDay: PropTypes.func,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number),
};
export default function CalendarPage({
  renderDay = () => null,
  yearAndMonth = [2022, 9],
}) {
  const [year, month] = yearAndMonth;
  const dispatch = useDispatch();

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    dispatch(setYearAndMonth([nextYear, nextMonth]));
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    dispatch(setYearAndMonth([nextYear, nextMonth]));
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    dispatch(setYearAndMonth([nextYear, nextMonth]));
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    dispatch(setYearAndMonth([nextYear, nextMonth]));
  };

  const handleAddReminder = (day) => {
    if (day.isCurrentMonth) {
      dispatch(setToggleModal());
      dispatch(setSelectedDate(day.dateString));
    }
  };

  const handleEditReminder = (reminder) => {
    dispatch(setSelectedRemindner(reminder));
  };

  const reminders = useSelector(selectReminders);

  const findItemsForDay = (day) => {
    const items = reminders?.filter((item) => item.date === day.dateString);
    items?.sort((a, b) => a.time.slice(0, 2) - b.time.slice(0, 2));
    return items?.map((i, index) => (
      <p
        style={{ margin: 2 }}
        key={index}
        onClick={() => handleEditReminder(i)}
      >
        <p className="timeSpan">{i.time} </p> {i.reminder}
      </p>
    ));
  };

  return (
    <div className="container">
      <div className="calendar-root">
        <div className="navigation-header">
          <div className="month-nav-arrow-buttons">
            <Button onClick={handleMonthNavBackButtonClick}>prev</Button>
            <Button onClick={handleMonthNavForwardButtonClick}>next</Button>
          </div>
          <div>
            <select
              className="month-select"
              value={month}
              onChange={handleMonthSelect}
              placeholder="month"
            >
              {getMonthDropdownOptions().map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              className="year-select"
              value={year}
              onChange={handleYearSelect}
              placeholder="year"
            >
              {getYearDropdownOptions(year).map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={classNames("day-of-week-header-cell", {
                "weekend-day": [6, 0].includes(index),
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="days-grid">
          {calendarGridDayObjects.map((day) => (
            <div
              key={day.dateString}
              onClick={() => handleAddReminder(day)}
              className={classNames("day-grid-item-container", {
                "weekend-day": isWeekendDay(day.dateString),
                "current-month": day.isCurrentMonth,
              })}
            >
              <div className="day-content-wrapper">
                {renderDay(day)}
                {findItemsForDay(day)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}
