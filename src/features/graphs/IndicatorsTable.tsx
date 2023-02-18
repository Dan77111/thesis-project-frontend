import React from 'react';
import { selectSingleValue } from '../../utils/selectors';
import { useAppSelector } from '../../app/hooks';
import { FilterState, IndicatorsState } from '../../utils/typedefs';

const IndicatorsTable = () => {
  const indicatorsState: IndicatorsState = useAppSelector(
    (state) => state.indicators
  );
  const filterState: FilterState = useAppSelector((state) => state.filters);

  var inc = 0;

  return (
    (!filterState.visualizerValid && (
      <h1>Select at least one filter for each category</h1>
    )) || (
      <table>
        <thead>
          <tr>
            <th className='table--headers'></th>
            <th className='table--headers'></th>
            {filterState.visualizerLocations.map((location) => {
              return (
                <th className='table--headers' key={inc++}>
                  {location}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filterState.visualizerIndicators.map((indicator) => {
            return filterState.visualizerYears.map((year, index) => {
              return (
                <tr key={inc++}>
                  {index === 0 && (
                    <td
                      rowSpan={filterState.visualizerYears.length}
                      className='table--headers'
                    >
                      {indicator}
                    </td>
                  )}
                  <td className='table--headers'>{year}</td>
                  {filterState.visualizerLocations.map((location) => {
                    return (
                      <td key={inc++}>
                        {selectSingleValue(
                          indicatorsState,
                          indicator,
                          location,
                          year
                        ) || '-'}
                      </td>
                    );
                  })}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    )
  );
};

export default IndicatorsTable;
