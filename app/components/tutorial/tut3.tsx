import react from 'react';
import { Link } from 'remix';
import styled from 'styled-components';

const ModalBlackout = styled.div`
  z-index: 50;
  
  position: fixed;
  display: grid;
  grid-template-columns: 4rem 3fr 2fr;
  grid-template-rows: 1fr 8rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > div {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    position: relative;

    &.show {
      height: 0;
      width: 0;
    }
  }
`;

const ModalWrapper = styled.div`


  position: absolute;

  width: 80%;
  left: 10%;
  bottom: 30px;

  background-color: ${({theme}) => theme.colors.backgroundColor};
  color: ${({theme}) => theme.colors.textColor};
  border-radius: 5px;
  z-index: 101;

  padding: 2rem;

  & a {
    border: 1px solid ${({theme}) => theme.colors.textColor};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.textColor};
    text-decoration: none;
    margin-top: 1rem;

    &:hover {
      background-color: ${({theme}) => theme.colors.textColor};
      color: ${({theme}) => theme.colors.backgroundColor};
    }
  }

  & > * {
    margin-bottom: 1rem;
  }
`;

const TutText = () => {
  return <>
    <ModalBlackout>
      <div></div>
      <div>
        <ModalWrapper>
          <h1>2. Action panel</h1>
          <p>Here is where you can deploy your bot as a smart contract, and play a game against us or against another player by calling into the Orbidity smart contract.</p>
          <p>You can run everything in a Blockchain running within your browser, or flick the switch to use your real <b>Metamask</b> wallet and play games on the Ethereum network.</p>
          <p><Link to="/app/tutorial4">Next!</Link></p>
        </ModalWrapper>
      </div>
      <div></div>
      <div></div>
      <div className="show"></div>
      <div></div>
    </ModalBlackout>
  </>
}

export default TutText;