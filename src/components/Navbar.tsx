import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const Navbar = () => {
  const { activePage } = useAppSelector((state) => state.activePage);

  return (
    <nav className='navbar'>
      <ul className='navigation navigation--links'>
        <li>
          <NavLink
            to='/'
            className={`navigation--element ${
              activePage === 'home' ? 'navigation--element--active' : ''
            }`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/indicators'
            className={`navigation--element ${
              activePage === 'indicators' ? 'navigation--element--active' : ''
            }`}
          >
            Indicators
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/analysis'
            className={`navigation--element ${
              activePage === 'analysis' ? 'navigation--element--active' : ''
            }`}
          >
            Analysis
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/info'
            className={`navigation--element ${
              activePage === 'info' ? 'navigation--element--active' : ''
            }`}
          >
            Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
