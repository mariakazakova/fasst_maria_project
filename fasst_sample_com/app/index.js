import 'react-datepicker/dist/react-datepicker.css';
import './less/app.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Tokens from './lib/Tokens';
import Routes from './Routes';
import { CookiesProvider } from 'react-cookie';
import Moment from 'moment';
import { ThemeProvider } from 'styled-components';
import Environment from './_graphql/Environment';
import theme from './theme';

let environment;

// eslint-disable-next-line
Tokens.setKey(API_USER_ID, API_KEY);

const getDocumentRoot = () => {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
};

Moment.locale('fr');

(async () => {
  environment = await Environment();
  ReactDOM.render(
    <div>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Routes/>
        </CookiesProvider>
      </ThemeProvider>
    </div>,
    getDocumentRoot()
  );
})();

export {
  environment
};
