import react, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons'

interface GameTurns {
  player1: {num:number,suit:'spades'|'diamonds'|'clubs'|'hearts'}[];
  player2: {num:number,suit:'spades'|'diamonds'|'clubs'|'hearts'}[];
}

const Blackj = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 1rem;
  color: ${({theme}) => theme.colors.textColor};

  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    color: ${({theme}) => theme.colors.textColor};
    text-decoration: none;
    font-size: 2rem;
    margin: 3rem;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      
      &:hover {
        color: ${({theme}) => theme.colors.contrastColor};
      }
    }

    &:hover {
      color: ${({theme}) => theme.colors.textColor};
    }
  }
`;

const GameBoard = styled.div`
`;

const Player = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const exampleGame: GameTurns = {
  player1: [
    {num:4,suit:'spades'},
    {num:5,suit:'spades'},
    {num:7,suit:'spades'},
    {num:6,suit:'spades'}
  ],
  player2: [
    {num:9,suit:'spades'},
    {num:4,suit:'spades'},
    {num:5,suit:'spades'}
  ],
}

interface IBoard {
  gameState: GameTurns;
} 

const Board: React.FC<IBoard> = ({gameState}) => {
  return <>
    <GameBoard>
      <Player>
        {gameState.player1.map((card, i) => {
          return <p key={i}>{`${card.num} of ${card.suit}`}</p>
        })}
      </Player>
      <Player>
        {gameState.player2.map((card, i) => {
           return <p key={i}>{`${card.num} of ${card.suit}`}</p>
        })}
      </Player>
    </GameBoard>
  </>
}

const Blackjack = () => {
  const [moveHistory, setMoveHistory] = useState<GameTurns>(exampleGame);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameState, setGameState] = useState<GameTurns>(exampleGame);

  return (
    <Blackj>
      <a>
        <FontAwesomeIcon icon={faAngleLeft} />
      </a>
      <Board gameState={gameState} />
      <a>
        <FontAwesomeIcon icon={faAngleRight} />
      </a>
    </Blackj>
  );
}

export default Blackjack;