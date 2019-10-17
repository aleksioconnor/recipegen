import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
      families: ['Pontano Sans', 'Roboto:400,500,700']
    }
  });

ReactDOM.render(
        <App />,
document.getElementById('root'));


