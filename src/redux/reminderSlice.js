import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  selectedDate: "",
  yearAndMonth: [2022, 9],
  reminders: [],
  selectedReminder: null,
};

export const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    setToggleModal: (state, action) => {
      state.modalOpen = !state.modalOpen;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setYearAndMonth: (state, action) => {
      state.yearAndMonth = action.payload;
    },
    addReminder: (state, action) => {
      if (state.reminders?.length > 0) {
        state.reminders = [...state.reminders, action.payload];
      } else {
        state.reminders = [action.payload];
      }
    },
    setSelectedRemindner: (state, action) => {
      state.selectedReminder = action.payload;
    },
    clearSelectedReminder: (state, aciton) => {
      state.selectedReminder = null;
    },
    updateReminder: (state, action) => {
      state.reminders = state.reminders.map((reminder) =>
        reminder.id === action.payload.id ? action.payload : reminder
      );
    },
  },
});

export const {
  setToggleModal,
  setSelectedDate,
  setYearAndMonth,
  addReminder,
  setSelectedRemindner,
  clearSelectedReminder,
  updateReminder,
} = reminderSlice.actions;

export const selectModalOpen = (state) => state.modalOpen;
export const selectSelectedDate = (state) => state.selectedDate;
export const selectYearAndMonth = (state) => state.yearAndMonth;
export const selectReminders = (state) => state.reminders;
export const selectSelectedReminder = (state) => state.selectedReminder;
