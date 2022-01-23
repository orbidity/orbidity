import react from 'react';
import { Link } from 'remix';
import styled from 'styled-components';

const ModalBlackout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
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
    <ModalBlackout />
    <ModalWrapper>
      <h1>Welcome to Orbidity!</h1>
      <p>Together, we’re going to learn how to write <b>smart contracts</b>, which let you build code to do whatever you want on the Ethereum blockchain. Smart contracts are the underpinning of NFTs, Web 3.0 websites, and many other other digital assets yet to take the world by storm.</p>
      <p>Smart contracts are basically an API that lives on the <b>Ethereum blockchain</b>. Ethereum transactions can execute code by calling into your API - meaning you don’t need any servers, and no one has to trust you to interact with your code. The state and behaviour of your code gets permanently saved into the blockchain.</p>
      <p>Your task is simple. We’ve created smart contracts that implement <b>Tic-Tac-Toe</b> and <b>Blackjack</b> completely autonomously, allowing two players to battle it out and bet <b>Orbs</b> on the outcome. You’ll need to get started with <b>Solidity</b>, the language used to write smart contracts, and write a bot to play these games.</p>
      <p>To get started, we’ve gifted you <b>10 Orbs</b>, and you can get more at any time!</p>
      <p><Link to="/app/tutorial2">Get started!</Link></p>
    </ModalWrapper>
  </>
}

export default TutText;