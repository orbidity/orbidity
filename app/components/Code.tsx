import react from 'react';
import Editor from '@monaco-editor/react';

import styled, { useTheme } from 'styled-components';
import { ITheme } from '~/theme/themes';

const CodeWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

const Code = () => {
  const theme: any = useTheme();

  return (
    <CodeWrapper>
      <Editor
        height="100%"
        defaultLanguage="sol"
        defaultValue="// some comment"
        theme={theme.editorTheme}
      />
    </CodeWrapper>
  );
}

export default Code;