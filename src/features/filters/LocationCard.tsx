import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LocationCardProp, IndicatorsState } from '../../utils/typedefs';
import { toggleLocationFilterReducer } from './filtersSlice';

const LocationCard = ({ id, type }: LocationCardProp) => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );

  const dispatch = useAppDispatch();

  return (
    <div
      className='location--card'
      onClick={() => {
        dispatch(toggleLocationFilterReducer({ value: id, type: type }));
      }}
    >
      <div className='location--card--code'>{id}</div>
      <div className='location--card--name'>
        {indicatorsState.names.locations[id]}
      </div>
    </div>
  );
};

export default LocationCard;
