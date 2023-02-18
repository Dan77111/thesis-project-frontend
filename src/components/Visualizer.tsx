import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { IndicatorsState } from '../utils/typedefs';
import { changeActivePage } from '../app/activePageSlice';
import Graph from '../features/graphs/Graph';
import GraphSelector from '../features/graphs/GraphSelector';
import Loading from './Loading';
import ErrorDisplay from './ErrorDisplay';
import IndicatorFilter from '../features/filters/IndicatorFilter';
import YearFilter from '../features/filters/YearFilter';
import LocationFilter from '../features/filters/LocationFilter';

const Visualizer = () => {
  const dispatch = useAppDispatch();
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );

  useEffect(() => {
    dispatch(changeActivePage('indicators'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    (indicatorsState.status === 'failed' && <ErrorDisplay />) ||
    (indicatorsState.status === 'idle' && (
      <div className='filters--graph--container'>
        <div className='filters--body'>
          <div className='filter--groups--list'>
            <IndicatorFilter type={'Visualizer'} />
            <LocationFilter type={'Visualizer'} />
            <YearFilter />
          </div>
        </div>
        <div className='graph--container'>
          <GraphSelector />
          <Graph />
        </div>
      </div>
    )) || <Loading />
  );
};

export default Visualizer;
