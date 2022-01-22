import react from 'react';
import { Link } from 'remix';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Themes from './../theme/themes';
import { useColor } from './../contexts/color';

const Side = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;

  .sidebar-icon {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    a {
      color: ${({theme}) => theme.colors.textColor};
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
    background-color: ${({theme}) => theme.colors.textColor};
  }

  .sidebar-spacer {
    flex-grow: 1;
  }
`;

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useColor();

  const toggleTheme = () => {
    // Get theme from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      setTheme(Themes['dark']);
      localStorage.setItem('theme', 'dark');
    } else {
      if (currentTheme === 'dark') {
        setTheme(Themes['light']);
        localStorage.setItem('theme', 'light');
      } else {
        setTheme(Themes['dark']);
        localStorage.setItem('theme', 'dark');
      }
    }
  }

  return <>
    <Side>
      <div className="sidebar-icon">
        <Link to="/">
          <FontAwesomeIcon icon={faCoins} />
        </Link>
      </div>
      <div className="sidebar-divider" />
      <div className="sidebar-icon">
        <Link to={'/app/tictactoe'} title={"Tic Tac Toe"}>
          <FontAwesomeIcon icon={ faTimesCircle } />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to={'/app/blackjack'} title={"Blackjack"}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spade" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-spade fa-w-16 fa-1x"><path fill="currentColor" d="M272.5 6.6c-9.3-8.8-23.8-8.8-33.1 0C191.4 52.4 53.6 185 32 208.9c-19.3 21.3-32 49.4-32 80.6C0 360 54.9 415.7 123.5 416c36.7.1 69.7-15.7 92.5-40.9-.1 36.6-.8 52.3-52.4 75.4-14.1 6.3-22.2 21.6-18.7 36.6 3.3 14.5 16.3 24.8 31.2 24.8h159.4c15.5 0 29.2-10.8 32.1-26 2.8-14.6-4.8-29.2-18.4-35.2-51.6-23-52.8-38.1-53-75.6 23.4 25.8 57.5 41.8 95.3 40.8 67.5-1.7 120.7-56.5 120.7-124 0-32.2-12.2-61.2-32-83.1C458.4 185 320.6 52.4 272.5 6.6z" className=""></path></svg>
        </Link>
      </div>
      <div className="sidebar-spacer" />
      <div className="sidebar-divider" />
      <div className="sidebar-icon">
        <a onClick={toggleTheme}>
          <FontAwesomeIcon icon={ theme.name === "light" ? faSun : faMoon } />
        </a>
      </div>
    </Side>
  </>
}

export default Sidebar;