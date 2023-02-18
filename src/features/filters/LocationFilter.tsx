import React, { useState } from 'react';
import { FilterSelector, FilterState, IndicatorsState } from '../../utils/typedefs';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { toggleElementById } from '../../utils/utilities';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLocationsByStatus } from '../../utils/selectors';
import LocationCard from './LocationCard';
import {
  addLocationFilterReducer,
  removeLocationFilterReducer,
} from './filtersSlice';

const LocationFilter = ({ type: filterType }: FilterSelector) => {
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
    toggleElementById('locationFilterCollapsible', 'flex');
  };

  const selectAll = () => {
    selectLocationsByStatus(
      indicatorsState,
      filtersState,
      false,
      filterType
    ).forEach((location) => {
      dispatch(addLocationFilterReducer({ value: location, type: filterType }));
    });
  };

  const deselectAll = () => {
    selectLocationsByStatus(indicatorsState, filtersState, true, filterType).forEach(
      (location) => {
        dispatch(removeLocationFilterReducer({ value: location, type: filterType }));
      }
    );
  };

  return (
    <div className='location--filter'>
      <div className='location--filter--title' onClick={toggleHidden}>
        <p>Filter Locations</p>
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
      <div className='location--filter--collapsible' id='locationFilterCollapsible'>
        <div className='location--filter--container'>
          <div className='location--filter--half'>
            <div className='location--filter--half--title'>Not Selected</div>
            <div className='location--filter--half--headers'>
              <div className='location--filter--half--header'>Code</div>
              <div className='location--filter--half--header'>Name</div>
            </div>
            {selectLocationsByStatus(
              indicatorsState,
              filtersState,
              false,
              filterType
            ).map((location) => {
              return <LocationCard key={location} id={location} type={filterType} />;
            })}
          </div>
          <div className='location--filter--half'>
            <div className='location--filter--half--title'>Selected</div>
            <div className='location--filter--half--headers'>
              <div className='location--filter--half--header'>Code</div>
              <div className='location--filter--half--header'>Name</div>
            </div>
            {selectLocationsByStatus(
              indicatorsState,
              filtersState,
              true,
              filterType
            ).map((location) => {
              return <LocationCard key={location} id={location} type={filterType} />;
            })}
          </div>
        </div>
        <div className='location--select--button--container'>
          <div className='location--select--button--container--title'>All</div>
          <div className='location--select--buttons'>
            <div className='location--select--button' onClick={() => selectAll()}>
              Select All
            </div>
            <div className='location--select--button' onClick={() => deselectAll()}>
              Deselect All
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
