import { scaleLinear } from 'd3-scale';
import { AnalysisPayload, FilterState, FilterType } from './typedefs';

export const toggleElementById = (id: string, correctDisplay: string) => {
  if (document.getElementById(id)?.style.display === 'none') {
    (document.getElementById(id) as HTMLElement).style.display = correctDisplay;
  } else {
    (document.getElementById(id) as HTMLElement).style.display = 'none';
  }
};

export const toggleSelected = (id: string, className: string) => {
  return document.getElementById(id)!.classList.toggle(className);
};

export const graphTypes = ['table', 'map', 'bar', 'polarArea'];
export const graphTypesDisplay = ['TABLE', 'MAP', 'BAR GRAPH', 'POLAR AREA'];

const colorScale = scaleLinear<string>()
  .domain([0, 1])
  .range(['steelblue', 'green']);

export const generateGraphColors = (datapointNumber: number) => {
  const indexes = [];
  for (let i = 0; i < datapointNumber; i++) {
    indexes[i] = (1 / datapointNumber) * i;
  }
  return indexes.map((index) => colorScale(index));
};

export const graphOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const isValidForVisualization = (filter: FilterState) => {
  if (
    filter.visualizerIndicators.length !== 0 &&
    filter.visualizerLocations.length !== 0 &&
    filter.visualizerYears.length !== 0
  )
    return true;
  return false;
};

const isReadyForAnalysis = (
  filter: FilterState,
  indicatorsOrder: string[],
  types: string[],
  typeList: string[]
) => {
  typeList.forEach((type) => {
    let currentTypePresent = false;
    filter.analysisIndicators.forEach((indicator) => {
      if (
        !currentTypePresent &&
        types[indicatorsOrder.indexOf(indicator)] === type
      ) {
        currentTypePresent = true;
      }
    });
    if (currentTypePresent === false) {
      return false;
    }
  });
  if (filter.analysisLocations.length < 1) return false;
  return true;
};

const updateAvailableGraphs = (filter: FilterState) => {
  if (!filter.visualizerValid) {
    filter.visualizerAvailableGraphs = [];
    return;
  }
  let types: { [type: string]: boolean } = {};
  graphTypes.forEach((type) => {
    types[type] = false;
  });

  if (filter.visualizerIndicators.length >= 1) {
    if (filter.visualizerLocations.length >= 1) {
      if (filter.visualizerYears.length >= 1) {
        types.table = true;
        if (
          filter.visualizerLocations.length === 1 ||
          filter.visualizerYears.length === 1
        ) {
          types.bar = true;
          if (filter.visualizerYears.length === 1) {
            if (filter.visualizerIndicators.length === 1) {
              types.map = true;
            }
            if (filter.visualizerLocations.length === 1) {
              types.polarArea = true;
            }
          }
        }
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  filter.visualizerAvailableGraphs = graphTypes.filter((type) => {
    if (types[type] === true) return type;
  });
};

export const addIndicatorFilter = (
  filter: FilterState,
  payload: AnalysisPayload
) => {
  if (payload.type === 'Analysis') {
    filter.analysisIndicators = [...filter.analysisIndicators, payload.value];
    filter.analysisYears = [...filter.analysisYears, 'default'];
    if (
      !filter.analysisValid &&
      isReadyForAnalysis(
        filter,
        payload.indicatorsOrder,
        payload.types,
        payload.typeList
      )
    )
      filter.analysisValid = true;
  } else {
    filter.visualizerIndicators = [...filter.visualizerIndicators, payload.value];
    if (!filter.visualizerValid && isValidForVisualization(filter))
      filter.visualizerValid = true;
    updateAvailableGraphs(filter);
  }
};

export const addLocationFilter = (filter: FilterState, payload: AnalysisPayload) => {
  if (payload.type === 'Analysis') {
    filter.analysisLocations = [...filter.analysisLocations, payload.value];
    if (!filter.analysisValid) {
      filter.analysisValid = true;
    }
  } else {
    filter.visualizerLocations = [...filter.visualizerLocations, payload.value];
    if (!filter.visualizerValid && isValidForVisualization(filter))
      filter.visualizerValid = true;
    updateAvailableGraphs(filter);
  }
};

export const addYearFilter = (filter: FilterState, year: string) => {
  filter.visualizerYears = [...filter.visualizerYears, year];
  if (!filter.visualizerValid && isValidForVisualization(filter))
    filter.visualizerValid = true;
  updateAvailableGraphs(filter);
};

export const setYearForIndicator = (
  filter: FilterState,
  indicator: string,
  year: string
) => {
  filter.analysisYears[filter.analysisIndicators.indexOf(indicator)] = year;
};

export const removeIndicatorFilter = (
  filter: FilterState,
  payload: AnalysisPayload
) => {
  if (payload.type === 'Analysis') {
    const index = filter.analysisIndicators.indexOf(payload.value);
    filter.analysisIndicators.splice(index, 1);
    filter.analysisYears.splice(index, 1);
    if (
      !filter.analysisValid &&
      isReadyForAnalysis(
        filter,
        payload.indicatorsOrder,
        payload.types,
        payload.typeList
      )
    )
      filter.analysisValid = true;
  } else {
    filter.visualizerIndicators.splice(
      filter.visualizerIndicators.indexOf(payload.value),
      1
    );
    if (filter.visualizerValid && !isValidForVisualization(filter))
      filter.visualizerValid = false;
    updateAvailableGraphs(filter);
  }
};

export const removeLocationFilter = (
  filter: FilterState,
  payload: AnalysisPayload
) => {
  if (payload.type === 'Analysis') {
    filter.analysisLocations.splice(
      filter.analysisLocations.indexOf(payload.value),
      1
    );
    if (!filter.analysisValid && filter.analysisLocations.length >= 1)
      filter.analysisValid = true;
  } else {
    filter.visualizerLocations.splice(
      filter.visualizerLocations.indexOf(payload.value),
      1
    );
    if (filter.visualizerValid && !isValidForVisualization(filter))
      filter.visualizerValid = false;
    updateAvailableGraphs(filter);
  }
};

export const removeYearFilter = (filter: FilterState, year: string) => {
  filter.visualizerYears.splice(filter.visualizerYears.indexOf(year), 1);
  if (filter.visualizerValid && !isValidForVisualization(filter))
    filter.visualizerValid = false;
  updateAvailableGraphs(filter);
};

export const hasIndicatorFilter = (
  filter: FilterState,
  indicator: string,
  type: FilterType
) => {
  if (type === 'Analysis') {
    return filter.analysisIndicators.includes(indicator);
  } else {
    return filter.visualizerIndicators.includes(indicator);
  }
};

export const hasLocationFilter = (
  filter: FilterState,
  location: string,
  type: FilterType
) => {
  if (type === 'Analysis') {
    return filter.analysisLocations.includes(location);
  } else {
    return filter.visualizerLocations.includes(location);
  }
};

export const hasYearFilter = (filter: FilterState, year: string) => {
  return filter.visualizerYears.includes(year);
};
