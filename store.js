import { createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { devToolsEnhancer } from 'redux-devtools-extension'; // This extension is optional. I have it enabled to faciliate debugging.
import mainReducer from './reducers/MainReducer';

const store = createStore(mainReducer, devToolsEnhancer());
export default store;
