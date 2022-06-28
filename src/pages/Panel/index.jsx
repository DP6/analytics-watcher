import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './index.css';
// import './Panel.scss';
// import { red } from '@mui/material/colors';
// import { ThemeProvider, createTheme } from '@mui/material/styles';


// const cores = {
//     // Principais - vermelho
//     'Orange Red Crayola': '#FD4239',
//     'Amaranth': '#E70F47',
//     'Red NCS': '#BE0F34',

//     // Principais - Verde
//     'Sky Blue Crayola': '#14E0F8',
//     // 'Sky Blue Crayola': '#14E0F8',
//     'PAcific Blue': '#00C0D9',
//     'Mettalic Seaweed': '#007A94',
//     'Midnight Dream': '#004054',

//     // Neutras e omplementares
//     'Manatee': '#979BA3',
//     'Black Coral': '#5B626C',
//     'Charcoal': '#3C3F48',
//     'Rich Black': '#091923',

//     // Tons pastéis
//     'Linen': '#FFF4E8',
//     'Melon': '#FFCBBB',
//     'Smoothie': '#FFCCD7',
//     'Celeste': '#BEF9FF',
//     'Blizzard Blue': '#BDF0FF',
//     'Alice blue': '#E4EAF1',
// };

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: cores['Midnight Dream'],
//         },
//         secondary: {
//             main: '#FFFFFF',
//         },
//         warning: {
//             main: cores['Orange Red Crayola'],
//         },
//         mode: 'dark',
//     },
//     typography: {
//         fontFamily: 'Ubuntu Bold 700'
//     },
//     notchedOutline: {
//         borderWidth: '1px',
//         borderColor: 'yellow !important'
//     }
// });

// function App() {
//     // return <ThemeProvider theme={theme}><Panel /></ThemeProvider>;
//     return <App />;
// }


// render(<Panel />, window.document.querySelector('#app-container'));
render(<App />, window.document.querySelector('#app-container'));


if (module.hot) module.hot.accept();
