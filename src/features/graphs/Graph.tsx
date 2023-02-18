import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { FilterState, GraphState } from '../../utils/typedefs';
import BarGraph from './BarGraph';
import PolarAreaGraph from './PolarAreaGraph';
import IndicatorsTable from './IndicatorsTable';
import MapGraph from './MapGraph';
import ReactTooltip from 'react-tooltip';
import InvalidDataPlaceholder from './InvalidDataPlaceholder';

const Graph = () => {
  const filterState: FilterState = useAppSelector((state) => state.filters);
  const graphState: GraphState = useAppSelector((state) => state.graphs);
  const [content, setContent] = useState('');

  switch (graphState.activeGraphType) {
    case 'bar':
      if (filterState.visualizerAvailableGraphs.includes('bar')) return <BarGraph />;
      return <InvalidDataPlaceholder />;

    case 'polarArea':
      if (filterState.visualizerAvailableGraphs.includes('polarArea'))
        return <PolarAreaGraph />;
      return <InvalidDataPlaceholder />;

    case 'map':
      if (filterState.visualizerAvailableGraphs.includes('map'))
        return (
          <div>
            <MapGraph setTooltipContent={setContent} />
            <ReactTooltip className='map--tooltip' html={true}>
              {content}
            </ReactTooltip>
          </div>
        );
      return <InvalidDataPlaceholder />;

    default:
      if (filterState.visualizerAvailableGraphs.includes('table'))
        return <IndicatorsTable />;
      return <InvalidDataPlaceholder />;
  }
};

export default Graph;
