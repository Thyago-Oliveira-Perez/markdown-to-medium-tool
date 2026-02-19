import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './app.js';
import { store } from './state.js';
import './index.css';

const theme = createTheme();

const WrappedApp = props => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<WrappedApp />);
