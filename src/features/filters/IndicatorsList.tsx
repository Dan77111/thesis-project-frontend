import { toggleElementById } from '../../utils/utilities';
import { useAppSelector } from '../../app/hooks';
import { IndicatorsState } from '../../utils/typedefs';
import FilterCard from './FilterCard';

const IndicatorsList = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );

  return (
    <div className='filter--list'>
      <div
        className='filter--list--collapse'
        onClick={(e) => toggleElementById('indicatorsList', 'flex')}
      >
        <p className='filter--list--collapse--text'>Indicators</p>
        <p className='filter--list--collapse--icon'>V</p>
      </div>
      <div
        className='filter--card--list'
        style={{ display: 'none' }}
        id='indicatorsList'
      >
        {indicatorsState.indicatorsOrder.map((indicatorCode) => (
          <FilterCard
            key={indicatorCode}
            type={'Indicator'}
            title={indicatorCode}
            text={indicatorsState.names.indicators[indicatorCode]}
          />
        ))}
      </div>
    </div>
  );
};

export default IndicatorsList;
