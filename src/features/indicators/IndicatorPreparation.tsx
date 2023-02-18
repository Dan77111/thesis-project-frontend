import React from 'react';
import Dropdown from './Dropdown';
import ConstraintSlider from './ConstraintSlider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAnalysisArgument,
  setAnalysisMethod,
  setBenchmarkUnitRow,
  setStandardizationMethod,
} from './analysisSlice';

const IndicatorPreparation = () => {
  const analysisState = useAppSelector((state) => state.analysis);
  const dispatch = useAppDispatch();

  return (
    <div className='indicator--preparation'>
      <div className='indicator--preparation--title'>Indicator Preparation</div>
      <div className='indicator--preparation--sections'>
        <div className='indicator--preparation--section'>
          <div className='indicator--preparation--section--title'>
            Input Missing Data
          </div>
          <div className='indicator--preparation--section--content'>
            <Dropdown
              value={'Temp'}
              options={['1', '2', '3', '4']}
              dispatchFn={() => {}}
            />
          </div>
        </div>
        <div className='indicator--preparation--section'>
          <div className='indicator--preparation--section--title'>
            Choose Standardization
          </div>
          <div className='indicator--preparation--section--content'>
            <Dropdown
              value={analysisState.standardizationMethod}
              options={['Method 1', 'Method 2', 'Method 3', 'Method 4']}
              dispatchFn={setStandardizationMethod}
            />
          </div>
        </div>
        <div className='indicator--preparation--section'>
          <div className='indicator--preparation--section--title'>Choose Method</div>
          <div className='indicator--preparation--section--content'>
            <div className='indicator--preparation--section--content--subtitle'>
              Method
            </div>
            <Dropdown
              value={analysisState.analysisMethod}
              options={['Geometric Mean', 'Method 2', 'Method 3', 'Method 4']}
              dispatchFn={setAnalysisMethod}
            />
            <div className='indicator--preparation--section--content--subtitle'>
              Argument
            </div>
            <Dropdown
              value={analysisState.analysisArgument}
              options={['800', 'Value 2', 'Value 3', 'Value 4']}
              dispatchFn={setAnalysisArgument}
            />
            <div className='indicator--preparation--section--content--subtitle'>
              Upper Weight Constraint
            </div>
            <ConstraintSlider constraint='upper' />
            <div className='indicator--preparation--section--content--subtitle'>
              Lower Weight Constraint
            </div>
            <ConstraintSlider constraint='lower' />
            <div className='indicator--preparation--section--content--subtitle'>
              Benchmark Unit Row
            </div>
            <input
              className='benchmark--unit--row'
              value={analysisState.benchmarkUnitRow}
              type='number'
              onChange={(e) => {
                dispatch(setBenchmarkUnitRow(e.target.value));
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorPreparation;
