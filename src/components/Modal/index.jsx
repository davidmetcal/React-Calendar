import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";

import { getListOfTowns, getWeather } from "../../api";
import {
  addReminder,
  clearSelectedReminder,
  selectReminders,
  selectSelectedDate,
  selectSelectedReminder,
  setToggleModal,
  updateReminder,
} from "../../redux/reminderSlice";

const Modal = () => {
  const [time, setTime] = useState("12:00");
  const [reminder, setReminder] = useState("");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectdDate, setSelectedDate] = useState("");
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [townOptions, setTownOptions] = useState([]);
  const [weather, setWeather] = useState("");

  const selectedReminder = useSelector(selectSelectedReminder);
  const dispatch = useDispatch();

  const date = useSelector(selectSelectedDate);

  const reminders = useSelector(selectReminders);
  const getNextId = () => {
    if (reminders?.length === 0) return 1;
    return reminders?.reduce((prev, current) => {
      return prev.id > current.id ? prev.id + 1 : current.id + 1;
    });
  };

  const toggleDateSelect = () => {
    setShowDateSelect(!showDateSelect);
  };

  const toggleModal = () => {
    dispatch(setToggleModal());
    dispatch(clearSelectedReminder());
  };
  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  useEffect(() => {
    if (selectedReminder) {
      setTime(selectedReminder.time);
      setReminder(selectedReminder.reminder);
      setCity(selectedReminder?.city?.label);
      setSelectedCity(selectedReminder?.city);
    }
  }, [selectedReminder]);

  useEffect(() => {
    const getData = async () => {
      const results = await getWeather(selectedCity.key);

      setWeather(results.Headline.Text);
    };
    if (selectedCity) {
      getData();
    }
  }, [selectedCity]);

  const handleSubmit = () => {
    if (!selectedReminder) {
      dispatch(
        addReminder({
          id: getNextId(),
          date: selectdDate,
          time,
          reminder,
          city: selectedCity,
        })
      );
    } else {
      dispatch(
        updateReminder({
          id: selectedReminder.id,
          date: selectdDate,
          time,
          reminder,
          city: selectedCity,
        })
      );
    }
    dispatch(setToggleModal());
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getListOfTowns(city);
      if (result && result.length > 0) {
        setTownOptions(
          result.map((town) => {
            return {
              value: town.LocalizedName,
              label: `${town.LocalizedName}, ${town.Country.ID}`,
              key: town.Key,
            };
          })
        );
      }
    };
    getData();
  }, [city]);
  const handleTextAreaChange = (e) => {
    const limit = 30;
    setReminder(e.target.value.slice(0, limit));
  };

  return (
    <div className="modalWrapper">
      <div className="innerModalWrapper">
        <div className="reminderForm">
          <div className="closeButton">
            <AiOutlineCloseCircle
              size={30}
              onClick={toggleModal}
              style={{ float: "right" }}
              className="pointer"
            />
          </div>
          {showDateSelect ? (
            <input
              type="date"
              value={selectdDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              data-testid="dateSelector"
            />
          ) : (
            <div className="closeButton pointer" onClick={toggleDateSelect}>
              {selectdDate?.split("-").reverse().join("-")}{" "}
              <AiOutlineEdit size={18} />
            </div>
          )}

          <label className="spacer">
            <p>Time</p>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="spacer pointer"
            />
          </label>
          <label className="spacer">
            <p>Reminder</p>
            <textarea
              type="textarea"
              name="reminder"
              value={reminder}
              maxLength={30}
              className="reminderInput spacer"
              onChange={(e) => handleTextAreaChange(e)}
            />
          </label>
          <p data-testid="characterCount">{reminder.length} / 30</p>
          <label className="spacer">
            Location
            <Select
              type="text"
              name="city"
              value={selectedCity}
              onInputChange={(e) => setCity(e)}
              onChange={(e) => setSelectedCity(e)}
              options={townOptions}
              isClearable={true}
              data-testid="selectCity"
              className="spacer"
            />
          </label>

          <div>
            <p style={{ width: 400 }}>{weather}</p>
          </div>
          <div className="buttonContianer">
            <button
              onClick={handleSubmit}
              disabled={reminder.length === 0}
              className="spacer"
            >
              {selectedReminder ? "Update" : "Add to calender"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
