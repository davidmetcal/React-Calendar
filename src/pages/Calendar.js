import { useSelector } from "react-redux";

import CalendarPage, { CalendarDayHeader } from "../components/Calendar";
import Modal from "../components/Modal";
import { selectModalOpen, selectYearAndMonth } from "../redux/reminderSlice";

const Calendar = () => {
  const showModal = useSelector(selectModalOpen);
  const yearAndMonth = useSelector(selectYearAndMonth);

  return (
    <div className="container">
      {showModal && <Modal />}
      <CalendarPage
        yearAndMonth={yearAndMonth}
        renderDay={(calendarDayObject) => (
          <div>
            <CalendarDayHeader calendarDayObject={calendarDayObject} />
          </div>
        )}
      />
    </div>
  );
};

export default Calendar;
