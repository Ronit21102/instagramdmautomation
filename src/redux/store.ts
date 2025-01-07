"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AutomationReducer from "./slices/automation";
import { TypedUseSelectorHook, useSelector } from "react-redux";
const rootReducers = combineReducers({
  AutomationReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;