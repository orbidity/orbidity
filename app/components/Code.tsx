import react from 'react';
import Editor from '@monaco-editor/react';

import styled from 'styled-components';

const CodeWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
`;

const Code = () => {
  return (
    <CodeWrapper>
      <Editor
        height="100%"
        defaultLanguage="sol"
        defaultValue="// some comment"
        theme="vs-dark"
      />
    </CodeWrapper>
  );
}

export default Code;