import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IndicatorCardProp, IndicatorsState } from '../../utils/typedefs';
import { toggleIndicatorFilterReducer } from './filtersSlice';

const IndicatorCard = ({ id, type }: IndicatorCardProp) => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className='indicator--card'
      onClick={() => {
        dispatch(
          toggleIndicatorFilterReducer({
            value: id,
            type: type,
            typeList: indicatorsState.typeList,
            types: indicatorsState.types,
            indicatorsOrder: indicatorsState.indicatorsOrder,
          })
        );
      }}
    >
      <div className='indicator--card--code'>{id}</div>
      <div className='indicator--card--description'>
        {indicatorsState.names.indicators[id]}
      </div>
      <div className='indicator--card--uom'>
        {indicatorsState.uoms[indicatorsState.indicatorsOrder.indexOf(id)]}
      </div>
    </div>
  );
};

export default IndicatorCard;
