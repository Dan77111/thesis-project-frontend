import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { indicatorsReducer } from '../features/indicators/indicatorsSlice';

export const store = configureStore({
  reducer: {
    indicators: indicatorsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
