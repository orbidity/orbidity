import styled from 'styled-components';

// Components
import Sidebar from './../components/Sidebar';
import Code from './../components/Code';
import RunCode from './../components/RunCode';
import TicTacToe from './../components/games/TicTacToe';
import History from './../components/History';

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

export default function Index() {
  return (
    <Layout>
      <Sidebar />
      <div id="code">
        <Code />
        <RunCode />
      </div>
      
      <div id="evaluation">
        <TicTacToe />
        <History />
      </div>
    </Layout>
  );
}
