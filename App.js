

import React from 'react';

import { Provider } from 'react-redux';
import store from './store';


import AppNavigation from './AppNavigation';

export default function App(props) {
    return (
        <Provider store={store}>
            <AppNavigation/>
        </Provider>
    );
}