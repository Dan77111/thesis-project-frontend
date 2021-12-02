import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex navbar'>
      <ul className='navigation navigation--links'>
        <li>
          <NavLink
            to='/'
            className={(isActive) =>
              'navigation--element' +
              (isActive ? ' navigation--element--active' : '')
            }
          >
            Indicators
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/info'
            className={(isActive) =>
              'navigation--element' +
              (isActive ? ' navigation--element--active' : '')
            }
          >
            Info
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/saved-queries'
            className={(isActive) =>
              'navigation--element' +
              (isActive ? ' navigation--element--active' : '')
            }
          >
            Saved Queries
          </NavLink>
        </li>
      </ul>
      <ul className='navigation navigation--login'>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
