import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "./reducers";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
</Provider>
);


reportWebVitals();
