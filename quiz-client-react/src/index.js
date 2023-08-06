import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import {ContextProvider} from './hooks/useStateContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography:{
    fontFamily: "'Playfair Display', serif;",
    fontFamily: "'Open Sans' sans-serif"
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
