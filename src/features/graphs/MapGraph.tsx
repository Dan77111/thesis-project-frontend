import React, { Dispatch, SetStateAction, useEffect, useState, memo } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { useAppSelector } from '../../app/hooks';
import { selectByIndicatorYear } from '../../utils/selectors';

type MapGraphProps = {
  setTooltipContent: Dispatch<SetStateAction<string>>;
};
type CenterState = [[number, number], Dispatch<SetStateAction<[number, number]>>];

const MapGraph = ({ setTooltipContent }: MapGraphProps) => {
  const filterState = useAppSelector((state) => state.filters);
  const indicatorState = useAppSelector((state) => state.indicators);

  const [center, setCenter]: CenterState = useState([0, 0]);

  const geoUrl =
    'https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/2021/4326/20M/2.json';

  const dataset = selectByIndicatorYear(
    indicatorState,
    filterState.visualizerIndicators[0],
    filterState.visualizerYears[0],
    filterState.visualizerLocations
  );

  const colorScale = scaleLinear<string>()
    .domain([Math.min(...dataset.values), Math.max(...dataset.values)])
    .range(['red', 'green']);

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((data) => {
        setCenter([
          (data.bbox[0] + data.bbox[2]) / 2,
          (data.bbox[1] + data.bbox[3]) / 2,
        ]);
      });
  }, [geoUrl]);

  return (
    <div className='map--container'>
      <ComposableMap
        data-tip=''
        height={600}
        width={1000}
        projectionConfig={{
          center: center,
          scale: 800,
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const index = dataset.locations.indexOf(geo.properties.id);
                const value = index !== -1 ? dataset.values[index] : null;
                return (
                  <Geography
                    key={geo.rmsKey}
                    geography={geo}
                    fill={value ? colorScale(value) : '#666666'}
                    stroke='#FFFFFF'
                    strokeWidth={0.2}
                    onMouseEnter={() => {
                      const { id, na } = geo.properties;
                      if (value) setTooltipContent(`${id} — ${na} <br/> ${value}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapGraph);
