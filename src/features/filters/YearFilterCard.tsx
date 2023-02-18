import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { YearFilterCardProp } from '../../utils/typedefs';
import { toggleYearFilterReducer } from './filtersSlice';

const YearFilterCard = ({ id }: YearFilterCardProp) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className='year--card'
      onClick={() => {
        dispatch(
          toggleYearFilterReducer({
            value: id,
          })
        );
      }}
    >
      <div className='year--card--name'>{id}</div>
    </div>
  );
};

export default YearFilterCard;
