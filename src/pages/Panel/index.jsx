import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// // Instantiate class app and call methods
// let MyApp;
// MyApp = render(React.createElement(MyClassApp), window.document.querySelector('#app-container'));
// MyApp.myMethod();

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
