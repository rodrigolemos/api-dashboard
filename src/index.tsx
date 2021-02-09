import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './globalStyle';
import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
