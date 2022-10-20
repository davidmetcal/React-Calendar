import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import { reminderSlice } from "./reminderSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reminderSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const newStore = { persistor: persistStore(store), store };

export default newStore;
