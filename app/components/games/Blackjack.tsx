import react, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

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

const GameBoard = styled.div`
  width: 50%;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 0.5rem;

  span {
    font-weight: bold;

    &.winner {
      color: ${({theme}) => theme.colors.accents.winner};
    }
  
    &.loser {
      color: ${({theme}) => theme.colors.accents.loser};
    }
  }
`;

const Player = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;


interface IBoard {
  gameState: GameTurns;
  gameOver: boolean;
}

interface IStyledCard {
  suit: 'spades'|'diamonds'|'clubs'|'hearts';
}

const StyledCard = styled.div<IStyledCard>`
  color: ${props => props.suit === 'spades' || props.suit === 'clubs' ? 'black' : 'red'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  align-items: center;
  width: 100%;
  aspect-ratio: 2.5 / 3.5;
  border: 1px solid black;
  background-color: ${({theme}) => theme.colors.lightColor};
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 3px;

  & > span {
    line-height: 1;
  }
`;

const Card: React.FC<{num:number,suit:'spades'|'diamonds'|'clubs'|'hearts'}> = ({num,suit}) => {  
  return <>
    <StyledCard suit={suit}>
      <span>{num}</span>
      {
        suit === 'spades' && <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spade" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-spade fa-w-16 fa-1x"><path fill="currentColor" d="M272.5 6.6c-9.3-8.8-23.8-8.8-33.1 0C191.4 52.4 53.6 185 32 208.9c-19.3 21.3-32 49.4-32 80.6C0 360 54.9 415.7 123.5 416c36.7.1 69.7-15.7 92.5-40.9-.1 36.6-.8 52.3-52.4 75.4-14.1 6.3-22.2 21.6-18.7 36.6 3.3 14.5 16.3 24.8 31.2 24.8h159.4c15.5 0 29.2-10.8 32.1-26 2.8-14.6-4.8-29.2-18.4-35.2-51.6-23-52.8-38.1-53-75.6 23.4 25.8 57.5 41.8 95.3 40.8 67.5-1.7 120.7-56.5 120.7-124 0-32.2-12.2-61.2-32-83.1C458.4 185 320.6 52.4 272.5 6.6z" className=""></path></svg>
      }
      {
        suit === 'diamonds' && <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="diamond" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-diamond fa-w-14 fa-1x"><path fill="currentColor" d="M242.2 8.3c-9.6-11.1-26.8-11.1-36.4 0l-200 232c-7.8 9-7.8 22.3 0 31.3l200 232c9.6 11.1 26.8 11.1 36.4 0l200-232c7.8-9 7.8-22.3 0-31.3l-200-232z" className=""></path></svg>
      }
      {
        suit === 'clubs' && <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="club" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-club fa-w-16 fa-1x"><path fill="currentColor" d="M371.5 169.1C403.1 88.4 343.7 0 256 0c-87.8 0-147 88.5-115.5 169.1C65.7 159.2 0 217.3 0 292c0 68.5 55.5 124 124 124 36.5 0 69.3-15.8 92-40.9-.1 36.7-.8 52.4-53 75.6-13.8 6.1-21.4 21.1-18.3 35.9 3.1 14.8 16.2 25.4 31.3 25.4h160c15.1 0 28.2-10.6 31.3-25.4 3.1-14.8-4.5-29.7-18.3-35.9-51.6-23-52.8-38.1-53-75.6 22.7 25.1 55.5 40.9 92 40.9 68.5 0 124-55.5 124-124 0-74.8-65.8-132.8-140.5-122.9z" className=""></path></svg>
      }
      {
        suit === 'hearts' && <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-heart fa-w-16 fa-1x"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" className=""></path></svg>
      }
    </StyledCard>
  </>
}

const Board: React.FC<IBoard> = ({gameState, gameOver}) => {
  const [p1Total, setP1Total] = useState(0);
  const [p2Total, setP2Total] = useState(0);

  useEffect(() => {
    setP1Total(gameState?.player1?.reduce((a,b) => a + b.num,0));
    setP2Total(gameState?.player2?.reduce((a,b) => a + b.num,0));
  }, [gameState]);

  const spanClass = (player: 'player1'|'player2') => {
    if (player === 'player1' && p1Total < 22 && p1Total > p2Total % 21 && gameOver) return 'winner';
    if (player === 'player2' && p2Total < 22 && p2Total > p1Total % 21 && gameOver) return 'winner';
    if (player === 'player1' && p1Total > 21) return 'loser';
    if (player === 'player2' && p2Total > 21) return 'loser';
  }

  return <>
    <GameBoard>
      <div>
        <Player>
          {gameState?.player1?.map((card, i) => {
            return <Card {...card} />
          })}
        </Player>
        <p>Total: <span className={spanClass('player1')}>{p1Total}</span></p>
      </div>
      <div>
        <Player>
          {gameState?.player2?.map((card, i) => {
            return <Card {...card} />
          })}
        </Player>
        <p>Total: <span className={spanClass('player2')}>{p2Total}</span></p>
      </div>
    </GameBoard>
  </>
}

const exampleGame: GameTurns = {
  player1: [
    {num:4,suit:'spades'},
    {num:5,suit:'diamonds'},
    {num:7,suit:'hearts'},
    {num:6,suit:'clubs'}
  ],
  player2: [
    {num:9,suit:'clubs'},
    {num:4,suit:'diamonds'},
    {num:5,suit:'hearts'}
  ],
}

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

const Blackjack = () => {
  const [final, setFinal] = useState<GameTurns>(exampleGame)
  const [gameState, setGameState] = useState<GameTurns>({} as GameTurns);

  const [currentMove, setCurrentMove] = useState(0);
  const [moveHistory, setMoveHistory] = useState<GameTurns[]>([]);
  
  const [playing, setPlaying] = useState(false);

  const generateTurns = (finalState: GameTurns) => {
    const turns: GameTurns[] = [];
    
    const turn1 = {
      player1: finalState.player1.slice(0,2),
      player2: finalState.player2.slice(0,2)
    };

    turns.push(turn1);
    
    for (let i = 2; i < Math.max(
      finalState.player1.length,
      finalState.player2.length
      ); i++) {
        const turnA = {
          player1: finalState.player1.slice(0,Math.min(
            finalState.player1.length,i+1
            )),
            player2: finalState.player2.slice(0,Math.min(
          finalState.player2.length,i
        ))
      };
      const turnB = {
        player1: finalState.player1.slice(0,Math.min(
          finalState.player1.length,i+1
        )),
        player2: finalState.player2.slice(0,Math.min(
          finalState.player2.length,i+1
        ))
      };

      turns.push(turnA);
      if (
        turnA.player1.length !== turnB.player1.length ||
        turnA.player2.length !== turnB.player2.length
      ) {
        turns.push(turnB);
      }
    }
    return turns;
  }

  useEffect(() => {
    setGameState(moveHistory[currentMove]);
  }, [currentMove, moveHistory]);

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
    const turns = generateTurns(final);
    setMoveHistory(turns);
  }, [final]);

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


  return <>
    <Blackj>
      <div className='game'>
        <a className={currentMove === 0 ? 'disabled' : ''} onClick={() => prevMove()}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </a>
        <Board gameState={gameState} gameOver={currentMove === moveHistory.length - 1} />
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
    </Blackj>
    
  </>;
}

export default Blackjack;