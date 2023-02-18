import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { changeActivePage } from '../app/activePageSlice';

const Info = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeActivePage('info'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='info--cards--container'>
      <div className='info--card'>
        <div className='info--card--title'>Example</div>
        <hr className='info--card--separator' />
        <div className='info--card--text'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita vitae
          qui distinctio non atque est ducimus, suscipit libero similique voluptate
          temporibus. Libero error delectus officia earum. Nihil eius odio nostrum!
        </div>
      </div>
      <div className='info--card'>
        <div className='info--card--title'>Example</div>
        <hr className='info--card--separator' />
        <div className='info--card--text'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita vitae
          qui distinctio non atque est ducimus, suscipit libero similique voluptate
          temporibus. Libero error delectus officia earum. Nihil eius odio nostrum!
        </div>
      </div>
      <div className='info--card'>
        <div className='info--card--title'>Example</div>
        <hr className='info--card--separator' />
        <div className='info--card--text'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita vitae
          qui distinctio non atque est ducimus, suscipit libero similique voluptate
          temporibus. Libero error delectus officia earum. Nihil eius odio nostrum!
        </div>
      </div>
      <div className='info--card'>
        <div className='info--card--title'>Example</div>
        <hr className='info--card--separator' />
        <div className='info--card--text'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita vitae
          qui distinctio non atque est ducimus, suscipit libero similique voluptate
          temporibus. Libero error delectus officia earum. Nihil eius odio nostrum!
        </div>
      </div>
    </div>
  );
};

export default Info;
