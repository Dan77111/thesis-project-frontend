import { useEffect } from 'react';
import { changeActivePage } from '../app/activePageSlice';
import { useAppDispatch } from '../app/hooks';
import AnalysisYearSelector from '../features/filters/AnalysisYearSelector';
import IndicatorFilter from '../features/filters/IndicatorFilter';
import LocationFilter from '../features/filters/LocationFilter';
import IndicatorPreparation from '../features/indicators/IndicatorPreparation';

const Analysis = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeActivePage('analysis'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='analysis--container'>
      <IndicatorFilter type={'Analysis'} />
      <LocationFilter type={'Analysis'} />
      <AnalysisYearSelector />
      <IndicatorPreparation />
    </div>
  );
};

export default Analysis;
