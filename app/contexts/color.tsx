import React, { useState, useEffect, useContext } from 'react';
import Themes, { ITheme } from './../theme/themes';

interface ColorContext {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
}

const ColorContext = React.createContext<ColorContext>({} as ColorContext);

export const useColor = () => useContext(ColorContext);

export const ColorProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(Themes['dark']);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return(
    <ColorContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme
      }}
    >
      {children} 
    </ColorContext.Provider>
  )
}

export default ColorContext;