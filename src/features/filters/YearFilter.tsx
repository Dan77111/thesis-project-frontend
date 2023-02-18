import React, { useState } from 'react';
import { FilterState, IndicatorsState } from '../../utils/typedefs';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { toggleElementById } from '../../utils/utilities';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectYearsByStatus } from '../../utils/selectors';
import { addYearFilterReducer, removeYearFilterReducer } from './filtersSlice';
import YearFilterCard from './YearFilterCard';

const YearFilter = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );
  const filtersState: FilterState = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();

  const [hidden, setHidden] = useState(false);

  //Prevents highlighting of text on clicking while interacting with the selector
  document.addEventListener(
    'mousedown',
    function (event) {
      if (event.detail > 1) {
        event.preventDefault();
      }
    },
    false
  );

  const toggleHidden = () => {
    setHidden(!hidden);
    toggleElementById('yearFilterCollapsible', 'flex');
  };

  const selectAll = () => {
    selectYearsByStatus(indicatorsState, filtersState, false).forEach((location) => {
      dispatch(addYearFilterReducer({ value: location }));
    });
  };

  const deselectAll = () => {
    selectYearsByStatus(indicatorsState, filtersState, true).forEach((location) => {
      dispatch(removeYearFilterReducer({ value: location }));
    });
  };

  return (
    <div className='year--filter'>
      <div className='year--filter--title' onClick={toggleHidden}>
        <p>Filter Years</p>
        {(hidden && (
          <p>
            <FaAngleDown />
          </p>
        )) || (
          <p>
            <FaAngleUp />
          </p>
        )}
      </div>
      <div className='year--filter--collapsible' id='yearFilterCollapsible'>
        <div className='year--filter--container'>
          <div className='year--filter--half'>
            <div className='year--filter--half--title'>Not Selected</div>
            <div className='year--filter--half--headers'>
              <div className='year--filter--half--header'>Year</div>
            </div>
            {selectYearsByStatus(indicatorsState, filtersState, false).map(
              (year) => {
                return <YearFilterCard key={year} id={year} />;
              }
            )}
          </div>
          <div className='year--filter--half'>
            <div className='year--filter--half--title'>Selected</div>
            <div className='year--filter--half--headers'>
              <div className='year--filter--half--header'>Year</div>
            </div>
            {selectYearsByStatus(indicatorsState, filtersState, true).map((year) => {
              return <YearFilterCard key={year} id={year} />;
            })}
          </div>
        </div>
        <div className='year--select--button--container'>
          <div className='year--select--button--container--title'>All</div>
          <div className='year--select--buttons'>
            <div className='year--select--button' onClick={() => selectAll()}>
              Select All
            </div>
            <div className='year--select--button' onClick={() => deselectAll()}>
              Deselect All
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearFilter;
