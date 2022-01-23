import react from 'react';
import { Link } from 'remix';
import styled from 'styled-components';

const ModalBlackout = styled.div`
  z-index: 50;
  
  position: fixed;
  display: grid;
  grid-template-columns: 4rem 3fr 2fr;
  grid-template-rows: 1fr 1fr;
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
      <div></div>
      <div></div>
      <div></div>
      <div>
        <ModalWrapper>
          <h1>3. Transactions pane</h1>
          <p>Here you can see a list of all the transactions happening on the blockchain as you interact with it - this is how it all works under the hood. Every time you run some code, or Orbs exchange hands, there’s a transaction here.</p>
          <p>If you’re running low on Orbs, the big “Give me Orbs!” button will help you out by minting some more!</p>
          <p><Link to="/app/tutorial5">Next!</Link></p>
        </ModalWrapper>
      </div>
      <div className="show"></div>
    </ModalBlackout>
  </>
}

export default TutText;