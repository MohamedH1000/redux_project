import React from 'react'
import ReactDom from 'react-dom'
import App from './App';
import { store } from './app/store';
import { Provider } from "react-redux";

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <React.Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment>
)