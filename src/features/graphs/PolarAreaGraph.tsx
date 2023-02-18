import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { selectSingleValue } from '../../utils/selectors';
import { PolarArea } from 'react-chartjs-2';
import { useAppSelector } from '../../app/hooks';
import {
  Dataset,
  FilterState,
  GraphState,
  IndicatorsState,
} from '../../utils/typedefs';
import { generateGraphColors, graphOptions } from '../../utils/utilities';

ChartJS.register(RadialLinearScale, ArcElement, Title, Tooltip, Legend);

const PolarAreaGraph = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );
  const filterState: FilterState = useAppSelector((state) => state.filters);
  const graphState: GraphState = useAppSelector((state) => state.graphs);

  const [graphColors, setGraphColors] = useState(['']);

  useEffect(() => {
    setGraphColors(generateGraphColors(filterState.visualizerIndicators.length));
  }, [filterState.visualizerIndicators]);

  var labels: string[] = [];
  var datasets: Dataset[] = [];

  labels = filterState.visualizerIndicators;
  datasets = [
    {
      label: '#',
      data: filterState.visualizerIndicators.map((indicator) => {
        return selectSingleValue(
          indicatorsState,
          indicator,
          filterState.visualizerLocations[0],
          filterState.visualizerYears[0]
        );
      }),
      backgroundColor: graphColors,
    },
  ];

  const data = { labels, datasets };

  return <PolarArea options={graphOptions} data={data} />;
};

export default PolarAreaGraph;
