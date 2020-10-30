import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
