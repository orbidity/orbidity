import react from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired, faPlay, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

const Run = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
  padding: 1rem;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  .run-action {
    padding: 1rem 3rem;
    font-size: 2rem;
    color: #ccc;
    cursor: pointer;
    text-align: center;

    &:hover {
      color: #fff;
    }

    p {
      margin-top: 0.5rem;
      font-weight: bold;
      font-size: 1rem;
    }
  }
`;

const RunCode = () => {
  return (
    <Run>
      <div className="run-action">
        <FontAwesomeIcon icon={ faPlay } />
        <p>Run Locally</p>
      </div>
      <div className="run-action">
        <FontAwesomeIcon icon={ faNetworkWired } />
        <p>Add to blockchain</p>
      </div>
      <div className="run-action">
        <FontAwesomeIcon icon={ faFlagCheckered } />
        <p>Battle with others</p>
      </div>
    </Run>
  );
}

export default RunCode;