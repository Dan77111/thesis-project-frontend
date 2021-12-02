export const getSingleValue = (
  indicatorsOrder: string[],
  locationsOrder: string[],
  yearsOrder: string[],
  values: number[],
  indicatorName: string,
  locationName: string,
  yearName: string
): number => {
  const indicatorIndex = indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );
  const locationIndex = locationsOrder.findIndex(
    (location) => location === locationName
  );
  const yearIndex = yearsOrder.findIndex((year) => year === yearName);

  const totalIndex =
    indicatorIndex * locationsOrder.length +
    locationIndex * yearsOrder.length +
    yearIndex;
  return values[totalIndex];
};

//Getters for the values, they all have optional filtering via arrays listing the instances of the attributes not included in the name
export const getValuesByLocationAndYear = (
  indicatorsOrder: string[],
  locationsOrder: string[],
  yearsOrder: string[],
  values: number[],
  locationName: string,
  yearName: string,
  indicators?: string[]
) => {
  if (!indicators) {
    indicators = indicatorsOrder;
  }

  const result: number[] = [];

  const locationIndex = locationsOrder.findIndex(
    (location) => location === locationName
  );
  const yearIndex = yearsOrder.findIndex((year) => year === yearName);

  indicators.forEach((indicatorName) => {
    const indicatorIndex = indicatorsOrder.findIndex(
      (indicator) => indicator === indicatorName
    );
    const index =
      indicatorIndex * locationsOrder.length +
      locationIndex * yearsOrder.length +
      yearIndex;

    result.push(values[index]);
  });

  return { indicators: indicators, values: result };
};

export const getValuesByIndicatorAndLocation = (
  indicatorsOrder: string[],
  locationsOrder: string[],
  yearsOrder: string[],
  values: number[],
  indicatorName: string,
  locationName: string,
  years?: string[]
) => {
  if (!years) {
    years = yearsOrder;
  }

  const result: number[] = [];

  const indicatorIndex = indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );

  const locationIndex = locationsOrder.findIndex(
    (location) => location === locationName
  );

  years.forEach((yearName) => {
    const yearIndex = yearsOrder.findIndex((year) => year === yearName);

    const index =
      indicatorIndex * locationsOrder.length +
      locationIndex * yearsOrder.length +
      yearIndex;

    result.push(values[index]);
  });

  return { years: years, values: result };
};

export const getValuesByIndicator = (
  indicatorsOrder: string[],
  locationsOrder: string[],
  yearsOrder: string[],
  values: number[],
  indicatorName: string,
  locations?: string[],
  years?: string[]
) => {
  if (!locations) {
    locations = locationsOrder;
  }
  if (!years) {
    years = yearsOrder;
  }

  const result: number[][] = [];

  const indicatorIndex = indicatorsOrder.findIndex(
    (indicator) => indicator === indicatorName
  );

  locations.forEach((locationName) => {
    const locationIndex = locationsOrder.findIndex(
      (location) => location === locationName
    );
    const resultIndex = result.push([]);
    //This is never undefined because of the assignment at the start of the function but TS doen't accept it unless I use ?
    years?.forEach((yearName) => {
      const yearIndex = yearsOrder.findIndex((year) => year === yearName);

      const index =
        indicatorIndex * locationsOrder.length +
        locationIndex * yearsOrder.length +
        yearIndex;

      result[resultIndex].push(values[index]);
    });
  });
  return { locations: locations, years: years, values: values };
};

export const getValuesByLocation = (
  indicatorsOrder: string[],
  locationsOrder: string[],
  yearsOrder: string[],
  values: number[],
  locationName: string,
  indicators?: string[],
  years?: string[]
) => {
  if (!indicators) {
    indicators = indicatorsOrder;
  }
  if (!years) {
    years = yearsOrder;
  }

  const result: number[][] = [];

  const locationIndex = locationsOrder.findIndex(
    (location) => location === locationName
  );

  indicators.forEach((indicatorName) => {
    const indicatorIndex = indicatorsOrder.findIndex(
      (indicator) => indicator === indicatorName
    );

    const resultIndex = result.push([]);
    //This is never undefined because of the assignment at the start of the function but TS doen't accept it unless I use ?
    years?.forEach((yearName) => {
      const yearIndex = yearsOrder.findIndex((year) => year === yearName);

      const index =
        indicatorIndex * locationsOrder.length +
        locationIndex * yearsOrder.length +
        yearIndex;

      result[resultIndex].push(values[index]);
    });
  });

  return { indicators: indicators, years: years, values: result };
};
