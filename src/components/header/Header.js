import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import TokenService from '../../services/TokenService';
import CartContext from "../CartContext/CartContext";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    };
    
    componentDidMount(){
    }

    static contextType = CartContext;

    amountOfItems = ()=>{
        let amount = this.context.items.length;

        if(amount === 0){
            amount = null;
        };
        
        return amount;
    }

    renderCart = () => {
            return (
                <div id="cart-container">
                    <span id="cart-amount">{this.amountOfItems()}</span>

                    <FontAwesomeIcon className="fas-10x" id="cart-icon" icon={faShoppingCart} onClick={this.toggleCheckout}></FontAwesomeIcon>

                    <div id="checkout-container">
                        <div></div>
                        <span>
                            <Link className="to-checkout" to="/checkout" onClick={this.toggleCheckout}>Check out</Link>
                        </span>
                    </div>
                </div>
            )
    }

    toggleCheckout = ()=>{
        const checkout = document.getElementById("checkout-container");

        if(checkout.style.display === "block"){
            checkout.style.display = "none";
        } else{
            checkout.style.display = "block";
        }
    }

    handleLogOut = ()=>{
        TokenService.clearAuthToken();
        this.props.history.push("/");
    }

    render(){

        return (
            <header>
                
                <nav id="header-nav">
                    <ul className="logging-container">
                        {TokenService.hasAuthToken() ? <li><Link to="/" className="logging-link" onClick={this.handleLogOut}>Log Out</Link></li> : <>  
                    <li><Link to="/register" className="logging-link">Sign Up</Link></li>
                    <li><Link to="/login" className="logging-link">Log In</Link></li>
                </>}
                    </ul>
                    
                    <h2>Icon</h2>

                    {TokenService.hasAuthToken() ? this.renderCart() : null}

                    <ul id="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        {TokenService.hasAuthToken() ? <li><Link to="/user">Profile</Link></li> : ''}
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}