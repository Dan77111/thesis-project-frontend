import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterProp, FilterState } from '../../utils/typedefs';
import { toggleSelected } from '../../utils/utilities';
import {
  toggleIndicatorFilterReducer,
  toggleLocationFilterReducer,
  toggleYearFilterReducer,
} from './filtersSlice';

const FilterCard = ({ type, title, text }: FilterProp) => {
  const filterState: FilterState = useAppSelector((state) => state.filters);
  useEffect(() => {
    switch (type) {
      case 'Indicator':
        if (filterState.visualizerIndicators.includes(title))
          toggleSelected(title, 'selected');
        break;
      case 'Location':
        if (filterState.visualizerLocations.includes(title))
          toggleSelected(title, 'selected');
        break;
      case 'Year':
        if (filterState.visualizerYears.includes(title))
          toggleSelected(title, 'selected');
        break;
    }
    // eslint-disable-next-line
  }, []);
  const dispatch = useAppDispatch();
  const onClickFn = () => {
    toggleSelected(title, 'selected');
    switch (type) {
      case 'Indicator':
        dispatch(toggleIndicatorFilterReducer(title));
        break;
      case 'Location':
        dispatch(toggleLocationFilterReducer(title));
        break;
      case 'Year':
        dispatch(toggleYearFilterReducer(title));
        break;
    }
  };

  return (
    <div className='filter--card' id={title} onClick={onClickFn}>
      <h2 className='filter--card--title'>{title}</h2>
      <p className='filter--card--description'>{text}</p>
    </div>
  );
};

export default FilterCard;
