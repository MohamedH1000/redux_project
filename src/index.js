import React from 'react'
import ReactDom from 'react-dom'
import App from './App';
import { store } from './app/store';
import { Provider } from "react-redux";
import { fetchUsers } from './features/users/usersSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

store.dispatch(fetchUsers());

ReactDom.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/*' element={<App />}/>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)