import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { filtersReducer } from '../features/filters/filtersSlice';
import { indicatorsReducer } from '../features/indicators/indicatorsSlice';
import { analysisReducer } from '../features/indicators/analysisSlice';
import { graphsReducer } from '../features/graphs/graphsSlice';
import { activePageReducer } from './activePageSlice';

export const store = configureStore({
  reducer: {
    indicators: indicatorsReducer,
    analysis: analysisReducer,
    filters: filtersReducer,
    graphs: graphsReducer,
    activePage: activePageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
