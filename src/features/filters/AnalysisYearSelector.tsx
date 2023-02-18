import React, { useState } from 'react';
import { toggleElementById } from '../../utils/utilities';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const AnalysisYearSelector = () => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => {
    setHidden(!hidden);
    toggleElementById('yearSelectorCollapsible', 'flex');
  };

  return (
    <div className='year--selector'>
      <div className='year--selector--title' onClick={toggleHidden}>
        <p>Select Years</p>
        {(hidden && (
          <p>
            <FaAngleDown />
          </p>
        )) || (
          <p>
            <FaAngleUp />
          </p>
        )}
      </div>
      <div
        id='yearSelectorCollapsible'
        className='year--selector--collapsible'
      ></div>
    </div>
  );
};

export default AnalysisYearSelector;
