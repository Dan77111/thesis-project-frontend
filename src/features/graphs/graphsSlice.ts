import { createSlice } from '@reduxjs/toolkit';
import { GraphState } from '../../utils/typedefs';
import { graphTypes, graphTypesDisplay } from '../../utils/utilities';

const initialState: GraphState = {
  activeGraphType: 'table',
  graphTypes: graphTypes,
  graphTypesDisplay: graphTypesDisplay,
};

export const graphsSlice = createSlice({
  name: 'graph',
  initialState: initialState,
  reducers: {
    setGraphType: (state, action) => {
      state.activeGraphType = action.payload;
    },
  },
});

const { actions } = graphsSlice;

export const graphsReducer = graphsSlice.reducer;

export const { setGraphType } = actions;
