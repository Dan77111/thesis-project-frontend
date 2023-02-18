import React from 'react';
import { useAppDispatch } from '../../app/hooks';

type DropdownProp = {
  value: string;
  options: string[];
  dispatchFn: Function;
};

const Dropdown = ({ value, options, dispatchFn }: DropdownProp) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <select
        className='dropdown'
        value={value}
        onChange={(e) => dispatch(dispatchFn(e.target.value))}
      >
        {options.map((option) => {
          return (
            <option className='dropdown--option' key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
