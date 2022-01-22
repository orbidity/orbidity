export interface ITheme {
  name: string;
  editorTheme: string;
  colors: {
    backgroundColor: string;
    borderColor: string;
    contrastColor: string;
    textColor: string;
    accents: {
      primary: string;
      secondary: string;
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
    textColor: '#fff',
    accents: {
      primary: '#FF7F45',
      secondary: '#41B4FF'
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
    textColor: '#333',
    accents: {
      primary: '#FF7F45',
      secondary: '#41B4FF'
    }
  }
}

export default {
  dark,
  light
}