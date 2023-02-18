import { toggleElementById } from '../../utils/utilities';
import { useAppSelector } from '../../app/hooks';
import { IndicatorsState } from '../../utils/typedefs';
import FilterCard from './FilterCard';

const YearsList = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );

  return (
    <div className='filter--list'>
      <div
        className='filter--list--collapse'
        onClick={(e) => toggleElementById('yearsList', 'flex')}
      >
        <p className='filter--list--collapse--text'>Years</p>
        <p className='filter--list--collapse--icon'>V</p>
      </div>
      <div className='filter--card--list' style={{ display: 'none' }} id='yearsList'>
        {indicatorsState.yearsOrder.map((yearCode) => (
          <FilterCard
            key={yearCode}
            type={'Year'}
            title={yearCode}
            text={indicatorsState.names.locations[yearCode]}
          />
        ))}
      </div>
    </div>
  );
};

export default YearsList;
