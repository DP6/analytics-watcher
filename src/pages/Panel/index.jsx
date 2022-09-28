import React from 'react';
import { render } from 'react-dom';
import App from './App';

// // Instantiate class app and call methods
// let MyApp;
// MyApp = render(React.createElement(MyClassApp), window.document.querySelector('#app-container'));
// MyApp.myMethod();

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
