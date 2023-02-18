export type IndicatorsState = {
  typeList: string[];
  types: string[];
  defaultYears: string[];
  uoms: string[];

  names: { [string: string]: { [string: string]: string } };
  indicatorsOrder: string[];
  locationsOrder: string[];
  yearsOrder: string[];

  values: number[];

  date: string;
  status: 'idle' | 'loading' | 'failed';
};

export type AnalysisState = {
  standardizationMethodsList: string[];
  analysisMethodsList: string[];
  analysisArgumentsList: string[];

  standardizationMethod: string;
  analysisMethod: string;
  analysisArgument: string;
  upperWeigthConstraint: number;
  lowerWeightConstraint: number;
  benchmarkUnitRow: number;

  analysisResult: number[];

  analysisStatus: 'idle' | 'loading' | 'failed';
  pageStatus: 'idle' | 'loading' | 'failed';
};

export type FilterState = {
  analysisIndicators: string[];
  analysisLocations: string[];
  analysisYears: string[];

  analysisValid: boolean;

  visualizerIndicators: string[];
  visualizerLocations: string[];
  visualizerYears: string[];

  visualizerValid: boolean;

  visualizerAvailableGraphs: string[];
};

export type AnalysisFilterState = {};

export type GraphState = {
  activeGraphType: 'table' | 'map' | 'bar' | 'polarArea';

  graphTypes: string[];
  graphTypesDisplay: string[];
};

export type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string | string[];
};

export type AnalysisPayload = {
  type: FilterType;
  types: string[];
  typeList: string[];
  indicatorsOrder: string[];

  value: string;
};

export type FilterProp = {
  type: 'Indicator' | 'Location' | 'Year';
  title: string;
  text: string;
};

export type IndicatorCardProp = {
  id: string;
  type: FilterType;
};

export type LocationCardProp = {
  id: string;
  type: FilterType;
};

export type YearFilterCardProp = {
  id: string;
};

export type YearSelectorCardProp = {
  indicatorId: string;
};

export type FilterSelector = {
  type: FilterType;
};

export type FilterType = 'Visualizer' | 'Analysis';
