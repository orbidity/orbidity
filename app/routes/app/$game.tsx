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
import {useEffect, useState} from 'react';

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

const emptyTicTacToeBoard = [0,0,0,0,0,0,0,0,0];

const Index = () => {
  const { theme, setTheme } = useColor();
  const game = useLoaderData();
  const [code, setCode] = useState(defaultStrategy);
  function onChange(value?: string) {
    setCode(value ?? "");
  }

  const [ticTacToeMoveHistory, setTicTacToeMoveHistory] = useState([emptyTicTacToeBoard]);

  async function onRunLocally() {
    const eth = await import("../../eth");
    if (game === "tictactoe") {
      const logs = await eth.runCodeLocally(code, "tic_tac_toe");
      const history = logs.map(log => log.board.map(cell => parseInt(cell)));
      history.unshift(emptyTicTacToeBoard);
      setTicTacToeMoveHistory(history);
    }
    // TODO: blackjack
  }

  useEffect(() => {
    // Get theme from localStorage
    const localTheme = localStorage.getItem('theme');

    // Set theme
    if (localTheme) {
      setTheme(Themes[localTheme as keyof typeof Themes]);
    }

    // Pre-warm local ethereum network (compile WASM, deploy contracts, etc)
    import("../../eth");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Sidebar />
        <div id="code">
          <Code defaultValue={code} onChange={onChange} />
          <RunCode onRunLocally={onRunLocally} />
        </div>

        <div id="evaluation">
          {
            game === 'tictactoe' && <TicTacToe moveHistory={ticTacToeMoveHistory} />
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

const defaultStrategy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import { Tic_tac_toe_strategy, Player } from "./tic_tac_toe.sol";

contract CustomStrategy is Tic_tac_toe_strategy {
    function get_move(Player[] memory _board) external override pure returns (uint) {
        // Returns first free position
        for (uint i = 0; i < _board.length; i++) {
            if (_board[i] == Player.None) return i;
        }
        
        // Returns last free position
        // for (uint i = _board.length - 1; i >= 0; i--) {
        //     if (_board[i] == Player.None) return i;
        // }
        
        // Cannot reach here
        revert();
    }
}
`

export default Index;
