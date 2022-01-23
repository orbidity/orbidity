export interface ITheme {
  name: string;
  editorTheme: string;
  colors: {
    backgroundColor: string;
    borderColor: string;
    contrastColor: string;
    lightColor: string,
    textColor: string;
    accents: {
      primary: string;
      secondary: string;
      winner: string;
      loser: string;
    }
  }
}

const dark: ITheme = {
  name: 'dark',
  editorTheme: 'vs-dark',
  colors: {
    backgroundColor: '#333',
    borderColor: '#555',
    contrastColor: '#ccc',
    lightColor: '#eee',
    textColor: '#fff',
    accents: {
      primary: '#FF7F45',
      secondary: '#41B4FF',
      winner: '#00ff00',
      loser: '#ff0000',
    }
  }
}

const light: ITheme = {
  name: 'light',
  editorTheme: 'light',
  colors: {
    backgroundColor: '#eee',
    borderColor: '#444',
    contrastColor: '#777',
    lightColor: '#eee',
    textColor: '#333',
    accents: {
      primary: '#FF7F45',
      secondary: '#41B4FF',
      winner: '#00ff00',
      loser: '#ff0000',
    }
  }
}

export default {
  dark,
  light
}