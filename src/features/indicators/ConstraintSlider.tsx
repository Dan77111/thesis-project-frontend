import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLowerWeightConstraint, setUpperWeightConstraint } from './analysisSlice';

type ConstraintSliderProp = {
  constraint: 'upper' | 'lower';
};

const ConstraintSlider = ({ constraint }: ConstraintSliderProp) => {
  const dispatch = useAppDispatch();
  const analysisState = useAppSelector((state) => state.analysis);

  return (
    <div className='slider--container'>
      <input
        className='slider'
        type='range'
        min='0'
        max='1'
        step='0.1'
        value={
          (constraint === 'upper' && analysisState.upperWeigthConstraint) ||
          analysisState.lowerWeightConstraint
        }
        onChange={(e) => {
          if (constraint === 'upper') {
            dispatch(setUpperWeightConstraint(e.target.value));
          } else {
            dispatch(setLowerWeightConstraint(e.target.value));
          }
        }}
      ></input>
      <div className='slider--steps'>
        <div className='slider--step'>0</div>
        <div className='slider--step'>0.1</div>
        <div className='slider--step'>0.2</div>
        <div className='slider--step'>0.3</div>
        <div className='slider--step'>0.4</div>
        <div className='slider--step'>0.5</div>
        <div className='slider--step'>0.6</div>
        <div className='slider--step'>0.7</div>
        <div className='slider--step'>0.8</div>
        <div className='slider--step'>0.9</div>
        <div className='slider--step'>1</div>
      </div>
    </div>
  );
};

export default ConstraintSlider;
