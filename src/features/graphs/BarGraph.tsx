import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  selectByIndicatorLocation,
  selectByIndicatorYear,
} from '../../utils/selectors';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../app/hooks';
import {
  Dataset,
  FilterState,
  GraphState,
  IndicatorsState,
} from '../../utils/typedefs';
import { generateGraphColors, graphOptions } from '../../utils/utilities';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
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

  var xAxis: 'years' | 'locations' = 'years';
  if (filterState.visualizerLocations.length === 1) {
    xAxis = 'years';
    labels = filterState.visualizerYears;
  } else if (filterState.visualizerYears.length === 1) {
    xAxis = 'locations';
    labels = filterState.visualizerLocations.map((location) => {
      return indicatorsState.names.locations[location];
    });
  }
  if (xAxis === 'years') {
    datasets = filterState.visualizerIndicators.map((indicator, index) => {
      return {
        label: indicator,
        data: selectByIndicatorLocation(
          indicatorsState,
          indicator,
          filterState.visualizerLocations[0],
          filterState.visualizerYears
        ).values,
        backgroundColor: graphColors[index],
      };
    });
  } else {
    datasets = filterState.visualizerIndicators.map((indicator, index) => {
      return {
        label: indicator,
        data: selectByIndicatorYear(
          indicatorsState,
          indicator,
          filterState.visualizerYears[0],
          filterState.visualizerLocations
        ).values,
        backgroundColor: graphColors[index],
      };
    });
  }
  const data = { labels, datasets };

  return <Bar options={graphOptions} data={data} />;
};

export default BarGraph;
