import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIndicatorsByType } from '../../utils/selectors';
import { FilterSelector, FilterState, IndicatorsState } from '../../utils/typedefs';
import { toggleElementById } from '../../utils/utilities';
import {
  addIndicatorFilterReducer,
  removeIndicatorFilterReducer,
} from './filtersSlice';
import IndicatorCard from './IndicatorCard';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const IndicatorFilter = ({ type: filterType }: FilterSelector) => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );
  const filtersState: FilterState = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();

  const [activeType, setActiveType] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setActiveType(indicatorsState.typeList[0]);
  }, [indicatorsState.typeList]);

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
    toggleElementById('indicatorFilterCollapsible', 'flex');
  };

  const selectType = () => {
    selectIndicatorsByType(
      indicatorsState,
      filtersState,
      false,
      activeType,
      filterType
    ).forEach((indicator) => {
      dispatch(
        addIndicatorFilterReducer({
          value: indicator,
          type: filterType,
          typeList: indicatorsState.typeList,
          types: indicatorsState.types,
          indicatorsOrder: indicatorsState.indicatorsOrder,
        })
      );
    });
  };
  const deselectType = () => {
    selectIndicatorsByType(
      indicatorsState,
      filtersState,
      true,
      activeType,
      filterType
    ).forEach((indicator) => {
      dispatch(
        removeIndicatorFilterReducer({
          value: indicator,
          type: filterType,
          typeList: indicatorsState.typeList,
          types: indicatorsState.types,
          indicatorsOrder: indicatorsState.indicatorsOrder,
        })
      );
    });
  };

  const selectAll = () => {
    indicatorsState.typeList.forEach((type) => {
      selectIndicatorsByType(
        indicatorsState,
        filtersState,
        false,
        type,
        filterType
      ).forEach((indicator) => {
        dispatch(
          addIndicatorFilterReducer({
            value: indicator,
            type: filterType,
            typeList: indicatorsState.typeList,
            types: indicatorsState.types,
            indicatorsOrder: indicatorsState.indicatorsOrder,
          })
        );
      });
    });
  };
  const deselectAll = () => {
    indicatorsState.typeList.forEach((type) => {
      selectIndicatorsByType(
        indicatorsState,
        filtersState,
        true,
        type,
        filterType
      ).forEach((indicator) => {
        dispatch(
          removeIndicatorFilterReducer({
            value: indicator,
            type: filterType,
            typeList: indicatorsState.typeList,
            types: indicatorsState.types,
            indicatorsOrder: indicatorsState.indicatorsOrder,
          })
        );
      });
    });
  };

  return (
    <div className='indicator--filter'>
      <div className='indicator--filter--title' onClick={toggleHidden}>
        <p>Filter Indicators</p>
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
      <div
        id='indicatorFilterCollapsible'
        className='indicator--filter--collapsible'
      >
        <div className='indicator--filter--categories'>
          {indicatorsState.typeList.map((type) => {
            return (
              <div
                key={type}
                id={type}
                className={`indicator--filter--category ${
                  activeType === type && 'indicator--filter--category--active'
                }`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </div>
            );
          })}
        </div>
        <div className='indicator--filter--container'>
          <div className='indicator--filter--half'>
            <div className='indicator--filter--half--title'>Not Selected</div>
            <div className='indicator--filter--half--headers'>
              <div className='indicator--filter--half--header'>Code</div>
              <div className='indicator--filter--half--header'>Description</div>
              <div className='indicator--filter--half--header'>U.O.M.</div>
            </div>
            {selectIndicatorsByType(
              indicatorsState,
              filtersState,
              false,
              activeType,
              filterType
            ).map((indicator) => {
              return (
                <IndicatorCard key={indicator} id={indicator} type={filterType} />
              );
            })}
          </div>
          <div className='indicator--filter--half'>
            <div className='indicator--filter--half--title'>Selected</div>
            <div className='indicator--filter--half--headers'>
              <div className='indicator--filter--half--header'>Code</div>
              <div className='indicator--filter--half--header'>Description</div>
              <div className='indicator--filter--half--header'>U.O.M.</div>
            </div>
            {selectIndicatorsByType(
              indicatorsState,
              filtersState,
              true,
              activeType,
              filterType
            ).map((indicator) => {
              return (
                <IndicatorCard key={indicator} id={indicator} type={filterType} />
              );
            })}
          </div>
        </div>
        <div className='indicator--select--button--containers'>
          <div className='indicator--select--button--container'>
            <div className='indicator--select--button--container--title'>Type</div>
            <div className='indicator--select--buttons'>
              <div
                className='indicator--select--button'
                onClick={() => selectType()}
              >
                Select All
              </div>
              <div
                className='indicator--select--button'
                onClick={() => deselectType()}
              >
                Deselect All
              </div>
            </div>
          </div>
          <div className='indicator--select--button--container'>
            <div className='indicator--select--button--container--title'>All</div>
            <div className='indicator--select--buttons'>
              <div className='indicator--select--button' onClick={() => selectAll()}>
                Select All
              </div>
              <div
                className='indicator--select--button'
                onClick={() => deselectAll()}
              >
                Deselect All
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorFilter;
