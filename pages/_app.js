import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import '../css/global.css';

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
