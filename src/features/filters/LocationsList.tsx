import { toggleElementById } from '../../utils/utilities';
import { useAppSelector } from '../../app/hooks';
import { IndicatorsState } from '../../utils/typedefs';
import FilterCard from './FilterCard';

const LocationsList = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );

  return (
    <div className='filter--list'>
      <div
        className='filter--list--collapse'
        onClick={(e) => toggleElementById('locationsList', 'flex')}
      >
        <p className='filter--list--collapse--text'>Locations</p>
        <p className='filter--list--collapse--icon'>V</p>
      </div>
      <div
        className='filter--card--list'
        style={{ display: 'none' }}
        id='locationsList'
      >
        {indicatorsState.locationsOrder.map((locationCode) => (
          <FilterCard
            key={locationCode}
            type={'Location'}
            title={locationCode}
            text={indicatorsState.names.locations[locationCode]}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsList;
