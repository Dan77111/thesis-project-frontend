import { createSlice } from '@reduxjs/toolkit';
import { AnalysisPayload, FilterState } from '../../utils/typedefs';
import {
  addIndicatorFilter,
  addLocationFilter,
  addYearFilter,
  hasIndicatorFilter,
  hasLocationFilter,
  hasYearFilter,
  removeIndicatorFilter,
  removeLocationFilter,
  removeYearFilter,
  setYearForIndicator,
} from '../../utils/utilities';

const initialState: FilterState = {
  analysisIndicators: [],
  analysisLocations: [],
  analysisYears: [],

  analysisValid: false,

  visualizerIndicators: ['GDP'],
  visualizerLocations: ['AT13'],
  visualizerYears: ['2018'],

  visualizerAvailableGraphs: ['table', 'map', 'bar', 'polarArea'],

  visualizerValid: true,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    toggleIndicatorFilterReducer: (state, action) => {
      if (hasIndicatorFilter(state, action.payload.value, action.payload.type)) {
        removeIndicatorFilter(state, action.payload);
      } else {
        addIndicatorFilter(state, action.payload);
      }
    },
    addIndicatorFilterReducer: (state, action) => {
      addIndicatorFilter(state, action.payload);
    },
    removeIndicatorFilterReducer: (state, action) => {
      removeIndicatorFilter(state, action.payload);
    },
    toggleLocationFilterReducer: (state, action) => {
      if (hasLocationFilter(state, action.payload.value, action.payload.type)) {
        removeLocationFilter(state, action.payload);
      } else {
        addLocationFilter(state, action.payload);
      }
    },
    addLocationFilterReducer: (state, action) => {
      addLocationFilter(state, action.payload);
    },
    removeLocationFilterReducer: (state, action) => {
      removeLocationFilter(state, action.payload);
    },
    toggleYearFilterReducer: (state, action) => {
      if (hasYearFilter(state, action.payload.value)) {
        removeYearFilter(state, action.payload);
      } else {
        addYearFilter(state, action.payload);
        state.visualizerYears.sort();
      }
    },
    addYearFilterReducer: (state, action) => {
      addYearFilter(state, action.payload);
      state.visualizerYears.sort();
    },
    removeYearFilterReducer: (state, action) => {
      removeYearFilter(state, action.payload);
    },
    setYearForIndicatorReducer: (state, action) => {
      setYearForIndicator(state, action.payload.indicator, action.payload.year);
    },
  },
});

const { actions } = filtersSlice;

export const filtersReducer = filtersSlice.reducer;

export const {
  toggleIndicatorFilterReducer,
  toggleLocationFilterReducer,
  toggleYearFilterReducer,
  addIndicatorFilterReducer,
  removeIndicatorFilterReducer,
  addLocationFilterReducer,
  removeLocationFilterReducer,
  addYearFilterReducer,
  removeYearFilterReducer,
} = actions;
