import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { GraphState } from '../../utils/typedefs';

const InvalidDataPlaceholder = () => {
  const graphState: GraphState = useAppSelector((state) => state.graphs);
  switch (graphState.activeGraphType) {
    case 'table':
      return (
        <div className='invalid--data--placeholder'>
          <h1>A Table Needs:</h1>
          <ul>
            <li>At least one indicator</li>
            <li>At least one location</li>
            <li>At least one year</li>
          </ul>
        </div>
      );
    case 'map':
      return (
        <div className='invalid--data--placeholder'>
          <h1>A Map Needs:</h1>
          <ul>
            <li>Exactly one indicator</li>
            <li>At least one location</li>
            <li>Exactly one year</li>
          </ul>
        </div>
      );
    case 'bar':
      return (
        <div className='invalid--data--placeholder'>
          <h1>A Bar Graph Needs:</h1>
          <ul>
            <li>At least one indicator</li>
            <li>Either one of: </li>
            <ul>
              <li>Exactly one location and at least one year</li>
              <li>Exactly one year and at least one location</li>
            </ul>
          </ul>
        </div>
      );
    case 'polarArea':
      return (
        <div className='invalid--data--placeholder'>
          <h1>A Table Needs:</h1>
          <ul>
            <li>At least one indicator</li>
            <li>At least one location</li>
            <li>At least one year</li>
          </ul>
        </div>
      );
    default:
      return <div className='invalid--data--placeholder'>Error</div>;
  }
};

export default InvalidDataPlaceholder;
