import react from 'react';
import Editor from '@monaco-editor/react';

import styled, { useTheme } from 'styled-components';
import { ITheme } from '~/theme/themes';

const CodeWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

interface CodeProps {
    defaultValue?: string;
    onChange?: (value?: string) => void;
}


const Code = ({ defaultValue, onChange }: CodeProps) => {
  const theme: any = useTheme();

  return (
    <CodeWrapper>
      <Editor
        height="100%"
        defaultLanguage="sol"
        defaultValue={defaultValue}
        theme={theme.editorTheme}
        onChange={onChange}
      />
    </CodeWrapper>
  );
}

export default Code;
