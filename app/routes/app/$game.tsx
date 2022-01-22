import { LoaderFunction, useLoaderData } from 'remix';
import styled, { ThemeProvider } from 'styled-components';

// Components
import Sidebar from '~/components/Sidebar';
import Code from '~/components/Code';
import RunCode from '~/components/RunCode';
import TicTacToe from '~/components/games/TicTacToe';
import Blackjack from '~/components/games/Blackjack';
import History from '~/components/History';

import { useColor } from '~/contexts/color';
import { useEffect } from 'react';

import Themes from '~/theme/themes';

export const loader: LoaderFunction = async ({params}) => params.game;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 4rem 3fr 2fr;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & > div {
    border-right: #555 solid 1px;

    &:last-child {
      border-right: none;
    }
  }

  #code {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 1fr 8rem;
  }

  #code, #evaluation {
    & > div {
      border-bottom: #555 solid 1px;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  #evaluation {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 1fr 1fr;
  }
`;

const Index = () => {
  const { theme, setTheme } = useColor();
  const game = useLoaderData();

  useEffect(() => {
    // Get theme from localStorage
    const localTheme = localStorage.getItem('theme');

    // Set theme
    if (localTheme) {
      setTheme(Themes[localTheme as keyof typeof Themes]);
    } 
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Sidebar />
        <div id="code">
          <Code />
          <RunCode />
        </div>
        
        <div id="evaluation">
          {
            game === 'tictactoe' && <TicTacToe />
          }
          {
            game === 'blackjack' && <Blackjack />
          }
          <History />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default Index;