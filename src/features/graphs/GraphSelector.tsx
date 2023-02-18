import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterState, GraphState } from '../../utils/typedefs';
import { setGraphType } from './graphsSlice';

const GraphSelector = () => {
  const dispatch = useAppDispatch();
  const graphState: GraphState = useAppSelector((state) => state.graphs);
  const filterState: FilterState = useAppSelector((state) => state.filters);
  return (
    <div className='graph--selector'>
      {graphState.graphTypes.map((type, index) => {
        return (
          <button
            key={type}
            className={
              'graph--selector--button ' +
              ((graphState.activeGraphType === type &&
                'graph--selector--button--active ') ||
                '') +
              ((!filterState.visualizerAvailableGraphs.includes(type) &&
                'graph--selector--button--disabled ') ||
                '')
            }
            onClick={() => dispatch(setGraphType(type))}
          >
            {graphState.graphTypesDisplay[index]}
          </button>
        );
      })}
    </div>
  );
};

export default GraphSelector;
