import react, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const Tic = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 1rem;
  color: ${({theme}) => theme.colors.textColor};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > .game {
    width: 100%;
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
  }
`;

const PlayControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 70%;

  & > a {
    margin: 0 1rem;
    color: ${({theme}) => theme.colors.textColor};
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      color: ${({theme}) => theme.colors.contrastColor};
  }
`;

const GameBoard = styled.div`
  aspect-ratio: 1;
  width: 50%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.5rem;
  background-color: ${({theme}) => theme.colors.contrastColor};

  & > div {
    background-color: ${({theme}) => theme.colors.backgroundColor};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 50%;
      aspect-ratio: 1;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.circle {
        background-color: ${({theme}) => theme.colors.accents.primary};
      }

      &.cross {
        background-color: ${({theme}) => theme.colors.accents.secondary};
      }

      & > svg {
        font-size: 2rem;
        color: ${({theme}) => theme.colors.textColor};
      }
    }

  }
`;

const exampleGame = [
  [0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0],
  [1,2,0,0,0,0,0,0,0],
  [1,2,1,0,0,0,0,0,0],
  [1,2,1,2,0,0,0,0,0],
  [1,2,1,2,1,0,0,0,0],
  [1,2,1,2,1,2,0,0,0],
  [1,2,1,2,1,2,1,0,0]
]

interface IBoard {
  gameState: number[];
} 

const Board: React.FC<IBoard> = ({gameState}) => {
  return <>
    <GameBoard>
    { gameState.map((tile, i) => <>
        <div key={i}>
          {tile === 0 ? null : tile === 1 ? <>
            <div className={'circle'}>
              <FontAwesomeIcon fixedWidth icon={faCircle} />
            </div>
          </> : <>
            <div className={'cross'}>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-fw fa-times fa-w-10 fa-1x"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
            </div>
          </>}
        </div>
      </>
    )}
    </GameBoard>
  </>
}

const TicTacToe = () => {
  const [moveHistory, setMoveHistory] = useState<number[][]>(exampleGame);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameState, setGameState] = useState<number[]>([]);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setGameState(moveHistory[currentMove]);
  }, [currentMove]);

  const nextMove = () => {
    if (currentMove < moveHistory.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  }

  const prevMove = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  useEffect(() => {
    if (playing) {
      var interval = setInterval(() => {
        if (currentMove < moveHistory.length - 1) {
          setCurrentMove(currentMove + 1);
        } else {
          setPlaying(false);
          clearInterval(interval);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [playing, currentMove]);

  return (
    <Tic>
      <div className='game'>
        <a className={currentMove === 0 ? 'disabled' : ''} onClick={() => prevMove()}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </a>
        <Board gameState={gameState} />
        <a className={currentMove === moveHistory.length - 1 ? 'disabled' : ''} onClick={() => nextMove()}>
          <FontAwesomeIcon icon={faAngleRight} />
        </a>
      </div>
      <PlayControls>
        <a onClick={() => setCurrentMove(0)}><FontAwesomeIcon icon={faStepBackward} /></a>
            
        <input
          type="range"
          min="0"
          max={moveHistory.length - 1}
          value={currentMove}
          onChange={(e) => setCurrentMove(e.target.valueAsNumber)}
        />
        {
          playing ?
            <a onClick={() => setPlaying(false)}><FontAwesomeIcon icon={faPause} /></a> :
            <a onClick={() => setPlaying(true)}><FontAwesomeIcon icon={faPlay} /></a>
        }

        <a onClick={() => setCurrentMove(moveHistory.length - 1)}><FontAwesomeIcon icon={faStepForward} /></a>
      </PlayControls>
    </Tic>
  );
}

export default TicTacToe;