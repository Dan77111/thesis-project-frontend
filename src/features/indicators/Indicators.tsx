import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCurrentIndicatorValues } from './indicatorsSlice';
import {
  getSingleValue,
  getValuesByIndicator,
  getValuesByIndicatorAndLocation,
  getValuesByLocation,
  getValuesByLocationAndYear,
} from '../../utils/indicatorUtilities';

const Indicators = () => {
  const dispatch = useAppDispatch();
  const {
    date,
    indicatorNames,
    locationNames,
    indicatorsOrder,
    locationsOrder,
    yearsOrder,
    status,
  } = useAppSelector((state) => state.indicators);

  useEffect(() => {
    dispatch(getCurrentIndicatorValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {(date === 'current' && 'Viewing current data') || `Viewing data from ${date}`}
      <br />
      {'Request status is : ' + status}
    </div>
  );
};

export default Indicators;
