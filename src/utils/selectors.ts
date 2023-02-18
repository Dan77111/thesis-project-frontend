import LocationsList from '../features/filters/LocationsList';
import { IndicatorsState, FilterState, FilterType } from '../utils/typedefs';

export const selectDataForAnalysis = (
  indicatorsState: IndicatorsState,
  filtersState: FilterState
) => {
  const nLocations = indicatorsState.locationsOrder.length;
  const nYears = indicatorsState.yearsOrder.length;
  return filtersState.analysisIndicators
    .map((indicator) => {
      return filtersState.analysisLocations
        .map((location) => {
          const startingIndex =
            indicatorsState.indicatorsOrder.indexOf(indicator) *
              nLocations *
              nYears +
            indicatorsState.locationsOrder.indexOf(location) * nYears;
          return indicatorsState.values.slice(startingIndex, startingIndex + nYears);
        })
        .flat();
    })
    .flat();
};

export const selectSingleValue = (
  state: IndicatorsState,
  indicatorName: string,
  locationName: string,
  yearName: string
): number => {
  const indicatorIndex = state.indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );
  const locationIndex = state.locationsOrder.findIndex(
    (location) => location === locationName
  );
  const yearIndex = state.yearsOrder.findIndex((year) => year === yearName);

  const totalIndex =
    indicatorIndex * state.locationsOrder.length * state.yearsOrder.length +
    locationIndex * state.yearsOrder.length +
    yearIndex;

  return state.values[totalIndex];
};

export const selectIndicatorsByType = (
  indicatorsState: IndicatorsState,
  filtersState: FilterState,
  filtered: boolean,
  type: string,
  filterType: FilterType
) => {
  var indicatorsList: string[];

  if (filtered) {
    indicatorsList = (
      (filterType === 'Analysis' && filtersState.analysisIndicators) ||
      filtersState.visualizerIndicators
    )
      // eslint-disable-next-line array-callback-return
      .filter((indicator) => {
        if (
          indicatorsState.types[
            indicatorsState.indicatorsOrder.indexOf(indicator)
          ] === type
        )
          return indicator;
      });
  } else {
    indicatorsList =
      // eslint-disable-next-line array-callback-return
      indicatorsState.indicatorsOrder.filter((indicator, index) => {
        if (
          !(
            (filterType === 'Analysis' && filtersState.analysisIndicators) ||
            filtersState.visualizerIndicators
          ).includes(indicator) &&
          indicatorsState.types[index] === type
        ) {
          return indicator;
        }
      });
  }
  return indicatorsList;
};

export const selectLocationsByStatus = (
  indicatorsState: IndicatorsState,
  filtersState: FilterState,
  filtered: boolean,
  filterType: FilterType
) => {
  var locationsList: string[];

  if (filtered) {
    locationsList =
      (filterType === 'Analysis' && filtersState.analysisLocations) ||
      filtersState.visualizerLocations;
  } else {
    // eslint-disable-next-line array-callback-return
    locationsList = indicatorsState.locationsOrder.filter((location) => {
      if (
        !(
          (filterType === 'Analysis' && filtersState.analysisLocations) ||
          filtersState.visualizerLocations
        ).includes(location)
      ) {
        return location;
      }
    });
  }

  return locationsList;
};

export const selectYearsByStatus = (
  indicatorsState: IndicatorsState,
  filtersState: FilterState,
  filtered: boolean
) => {
  var yearsList: string[];

  if (filtered) {
    yearsList = filtersState.visualizerYears;
  } else {
    // eslint-disable-next-line array-callback-return
    yearsList = indicatorsState.yearsOrder.filter((year) => {
      if (!filtersState.visualizerYears.includes(year)) {
        return year;
      }
    });
  }

  return yearsList;
};

//Getters for the values, they all have optional filtering via arrays listing the instances of the attributes not included in the name
export const selectByLocationYear = (
  state: IndicatorsState,
  locationName: string,
  yearName: string,
  indicators?: string[]
) => {
  var indicatorIndexes: number[];
  if (!indicators) {
    indicatorIndexes = state.indicatorsOrder.map((_, index) => index);
  } else {
    // eslint-disable-next-line array-callback-return
    indicatorIndexes = indicators.map((indicator) => {
      const index = state.indicatorsOrder.indexOf(indicator);
      if (index !== -1) {
        return index;
      }
    }) as number[];
  }

  const locationIndex = state.locationsOrder.findIndex(
    (location) => location === locationName
  );
  const yearIndex = state.yearsOrder.findIndex((year) => year === yearName);

  const result = indicatorIndexes.map((indicatorIndex) => {
    return state.values[
      indicatorIndex * state.locationsOrder.length +
        locationIndex * state.yearsOrder.length +
        yearIndex
    ];
  });

  return { indicators: indicators, values: result };
};

export const selectByIndicatorLocation = (
  state: IndicatorsState,
  indicatorName: string,
  locationName: string,
  years?: string[]
) => {
  if (!years) {
    years = state.yearsOrder;
  }

  const indicatorIndex = state.indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );

  const locationIndex = state.locationsOrder.findIndex(
    (location) => location === locationName
  );

  const result = years.map((yearName) => {
    const yearIndex = state.yearsOrder.indexOf(yearName);

    return state.values[
      indicatorIndex * state.locationsOrder.length +
        locationIndex * state.yearsOrder.length +
        yearIndex
    ];
  });

  return { years: years, values: result };
};

export const selectByIndicatorYear = (
  state: IndicatorsState,
  indicatorName: string,
  yearName: string,
  locations?: string[]
) => {
  if (!locations) {
    locations = state.locationsOrder;
  }

  const indicatorIndex = state.indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );

  const yearIndex = state.yearsOrder.findIndex((year) => year === yearName);

  const result = locations.map((locationName) => {
    const locationIndex = state.locationsOrder.indexOf(locationName);

    return state.values[
      indicatorIndex * state.locationsOrder.length +
        locationIndex * state.yearsOrder.length +
        yearIndex
    ];
  });

  return { locations: locations, values: result };
};

export const selectByIndicator = (
  state: IndicatorsState,
  indicatorName: string,
  locations?: string[],
  years?: string[]
) => {
  if (!locations) {
    locations = state.locationsOrder;
  }
  if (!years) {
    years = state.yearsOrder;
  }

  const indicatorIndex = state.indicatorsOrder.indexOf(indicatorName);

  const result = locations.map((locationName) => {
    const locationIndex = state.locationsOrder.indexOf(locationName);
    //This is never undefined because of the assignment at the start of the function but TS doen't accept it unless I use ?
    return years?.map((yearName) => {
      const yearIndex = state.yearsOrder.indexOf(yearName);

      return state.values[
        indicatorIndex * state.locationsOrder.length +
          locationIndex * state.yearsOrder.length +
          yearIndex
      ];
    });
  });
  return { locations: locations, years: years, values: result };
};

export const selectByLocation = (
  state: IndicatorsState,
  locationName: string,
  indicators?: string[],
  years?: string[]
) => {
  if (!indicators) {
    indicators = state.indicatorsOrder;
  }
  if (!years) {
    years = state.yearsOrder;
  }

  const locationIndex = state.locationsOrder.indexOf(locationName);

  const result = indicators.map((indicatorName) => {
    const indicatorIndex = state.indicatorsOrder.indexOf(indicatorName);

    //This is never undefined because of the assignment at the start of the function but TS doen't accept it unless I use ?
    return years?.forEach((yearName) => {
      const yearIndex = state.yearsOrder.findIndex((year) => year === yearName);

      return state.values[
        indicatorIndex * state.locationsOrder.length +
          locationIndex * state.yearsOrder.length +
          yearIndex
      ];
    });
  });

  return { indicators: indicators, years: years, values: result };
};
