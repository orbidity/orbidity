import react from 'react';
import styled from 'styled-components';

const Hist = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 1rem;
  color: ${({theme}) => theme.colors.textColor};
`;


const History = () => {
  return (
    <Hist>
      History
    </Hist>
  );
}

export default History;