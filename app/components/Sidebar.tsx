import react from 'react';
import { Link } from 'remix';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faAmbulance, faBacteria, faCloud, faCoins } from '@fortawesome/free-solid-svg-icons'

const Side = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
  padding: 0.5rem 0;

  .sidebar-icon {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    a {
      color: #fff;
      text-decoration: none;
    }

    svg {
      font-size: 1.5rem;
    }
  }

  .sidebar-divider {
    width: 2rem;
    margin: auto;
    height: 1px;
    background-color: #fff;

  }
`;

const Sidebar: React.FC = () => {
  return <>
    <Side>
      <div className="sidebar-icon">
        <Link to="/">
          <FontAwesomeIcon icon={faCoins} />
        </Link>
      </div>
      <div className="sidebar-divider" />
      <div className="sidebar-icon">
        <Link to={'/building'}>
          <FontAwesomeIcon icon={ faBuilding } />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to={'/ambulance'}>
          <FontAwesomeIcon icon={ faAmbulance } />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to={'/bacteria'}>
          <FontAwesomeIcon icon={ faBacteria } />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to={'/cloud'}>
          <FontAwesomeIcon icon={ faCloud } />
        </Link>
      </div>
    </Side>
  </>
}

export default Sidebar;