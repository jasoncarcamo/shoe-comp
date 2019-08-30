import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import {CartProvider} from "./components/CartContext/CartContext";
import './index.css';

ReactDOM.render(
<BrowserRouter>
    <CartProvider>
        <App></App>
    </CartProvider>    
</BrowserRouter>, document.getElementById('root'));
