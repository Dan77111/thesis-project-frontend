import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { selectDataForAnalysis } from '../../utils/selectors';
import { AnalysisState } from '../../utils/typedefs';

export const getAnalysisMethods = createAsyncThunk(
  'analysis/getMethods',
  async () => {
    const res = await fetch('http://localhost:3000/api/v1/analysis/methods').then(
      (data) => data.json()
    );
    return res;
  }
);

export const getAnalysisResults = createAsyncThunk(
  'analysis/getResult',
  async (_, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const analysisState = appState.analysis;
    const filtersState = appState.filters;
    const indicatorsState = appState.indicators;
    const res = await fetch('localhost:3000' + '/api/v1/analysis/new', {
      method: 'post',
      body: JSON.stringify({
        indicatorNames: filtersState.analysisIndicators,
        locationNames: filtersState.analysisLocations,
        selectedYears: filtersState.analysisYears,
        yearsList: indicatorsState.yearsOrder,
        indicatorValues: selectDataForAnalysis(indicatorsState, filtersState),
        standardizationData: { name: analysisState.standardizationMethod },
        analysisData: {
          name: analysisState.analysisMethod,
          argument: analysisState.analysisArgument,
          upperWeightConstraint: analysisState.upperWeigthConstraint,
          lowerWeightConstraint: analysisState.lowerWeightConstraint,
          benchmarkUnitRow: analysisState.benchmarkUnitRow,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => data.json());
    return res;
  }
);

const initialState: AnalysisState = {
  standardizationMethodsList: [],
  analysisMethodsList: [],
  analysisArgumentsList: [],

  standardizationMethod: '',
  analysisMethod: '',
  analysisArgument: '',
  upperWeigthConstraint: 0.9,
  lowerWeightConstraint: 0.1,
  benchmarkUnitRow: 1,

  analysisResult: [],

  analysisStatus: 'idle',
  pageStatus: 'idle',
};

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  // The `reducers` field defines reducers and generates associated actions
  reducers: {
    setStandardizationMethod: (state, action) => {
      state.standardizationMethod = action.payload;
    },
    setAnalysisMethod: (state, action) => {
      state.analysisMethod = action.payload;
    },
    setAnalysisArgument: (state, action) => {
      state.analysisArgument = action.payload;
    },
    setUpperWeightConstraint: (state, action) => {
      state.upperWeigthConstraint = action.payload;
    },
    setLowerWeightConstraint: (state, action) => {
      state.lowerWeightConstraint = action.payload;
    },
    setBenchmarkUnitRow: (state, action) => {
      state.benchmarkUnitRow = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisResults.pending, (state) => {
        state.analysisStatus = 'loading';
      })
      .addCase(getAnalysisResults.rejected, (state) => {
        state.analysisStatus = 'failed';
      })
      .addCase(getAnalysisResults.fulfilled, (state, { payload }) => {
        state.analysisResult = payload.resultValues;

        state.analysisStatus = 'idle';
      })
      .addCase(getAnalysisMethods.pending, (state) => {
        state.pageStatus = 'loading';
      })
      .addCase(getAnalysisMethods.rejected, (state) => {
        state.pageStatus = 'failed';
      })
      .addCase(getAnalysisMethods.fulfilled, (state, { payload }) => {
        state.standardizationMethodsList = payload.standardizationMethods;
        state.analysisMethodsList = payload.analysisMethods;
        state.analysisArgumentsList = payload.analysisArguments;

        state.standardizationMethod = state.standardizationMethodsList[0];
        state.analysisMethod = state.analysisMethodsList[0];
        state.analysisArgument = state.analysisArgumentsList[0];

        state.pageStatus = 'idle';
      });
  },
});

const { actions } = analysisSlice;

export const analysisReducer = analysisSlice.reducer;

export const {
  setAnalysisArgument,
  setAnalysisMethod,
  setLowerWeightConstraint,
  setStandardizationMethod,
  setUpperWeightConstraint,
  setBenchmarkUnitRow,
} = actions;
