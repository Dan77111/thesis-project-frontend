import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { changeActivePage } from '../app/activePageSlice';
import { useAppDispatch } from '../app/hooks';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeActivePage('home'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='homepage--container'>
      <div className='homepage--title'>Resilience Index</div>
      <div className='homepage--content'>
        <div className='homepage--content--section'>
          <h2 className='homepage--content--section--title'>Short Explanation</h2>
          <p className='homepage--content--section--text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ut,
            quidem aliquid temporibus deserunt soluta nesciunt, sed consectetur
            impedit tempora laborum assumenda id asperiores vero quo quae iure
            voluptatibus vel!
          </p>
        </div>
        <hr className='homepage--separator' />
        <div className='homepage--content--section'>
          <h2 className='homepage--content--section--title'>
            Methodological Papers
          </h2>
          <p className='homepage--content--section--text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ut,
            quidem aliquid temporibus deserunt soluta nesciunt, sed consectetur
            impedit tempora laborum assumenda id asperiores vero quo quae iure
            voluptatibus vel!
          </p>
        </div>
        <hr className='homepage--separator' />
        <div className='homepage--content--section'>
          <h2 className='homepage--content--section--title'>Standard Analysis</h2>
          <p className='homepage--content--section--text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ut,
            quidem aliquid temporibus deserunt soluta nesciunt, sed consectetur
            impedit tempora laborum assumenda id asperiores vero quo quae iure
            voluptatibus vel!
          </p>
        </div>
        <hr className='homepage--separator' />
        <div className='homepage--content--card--section'>
          <div className='homepage--card'>
            <div className='homepage--card--title'>Indicators</div>
            <hr className='homepage--separator' />
            <div className='homepage--card--text'>
              Here you can view the values of the indicators used to calculate the
              Resilience Index
            </div>
            <hr className='homepage--separator' />
            <Link className='homepage--button' to='/indicators'>
              View Indicator Values
            </Link>
          </div>
          <div className='homepage--card'>
            <div className='homepage--card--title'>Analysis</div>
            <hr className='homepage--separator' />
            <div className='homepage--card--text'>
              Here you can calculate your own custom Resilience Index with different
              weights and indicators
            </div>
            <hr className='homepage--separator' />
            <Link className='homepage--button' to='/analysis'>
              Calculate Your Custom Resilience Indicator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
