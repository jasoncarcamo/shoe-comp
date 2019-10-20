import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import TokenService from '../../services/TokenService';
import CartContext from "../CartContext/CartContext";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            screenWidth: window.innerWidth
        }
    };

    static contextType = CartContext;

    componentDidMount(){
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.handleResize);
    }

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

        if(checkout.style.display !== "block"){
            checkout.style.display = "block";
        } else{
            checkout.style.display = "none";
        }
    }

    renderLogin = ()=>{
        return (
            <>  
                <li>
                    <Link 
                        to="/register" 
                        className="logging-link" 
                        onClick={this.hideNav}>Sign Up</Link></li>
                <li>
                    <Link 
                        to="/login" 
                        className="logging-link" 
                        onClick={this.hideNav}>Log In</Link></li>
            </>
        );
    };

    handleLogOut = ()=>{
        TokenService.clearAuthToken();
        this.handleMenuIcon();
        this.props.history.push("/");
    };

    renderMenuIcon = ()=>{
        return (
            <div id="menu-icon" onClick={this.handleMenuIcon}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    handleMenuIcon = ()=>{
        const ul = document.getElementById("nav-links");

        if(this.state.screenWidth <= 770){
            
            ul.addEventListener("touchmove", (e)=>{
                e.preventDefault();
            });
            
            ul.classList.toggle("showUl");

        };
    };

    hideNav = (e)=>{
        const ul = document.getElementById("nav-links");

        if(this.state.screenWidth <= 770){
            ul.classList.toggle("showUl");
        };
    }

    handleResize = ()=>{
        this.setState({screenWidth: window.innerWidth})
    }

    render(){
        return (
            <header>
                
                <nav id="header-nav">
                    
                    <h2>
                        <Link to="/">Shoe comp</Link>
                    </h2>

                    {this.renderMenuIcon()}

                    {TokenService.hasAuthToken() ? this.renderCart() : null}

                    <ul id="nav-links">

                        <li>
                            <NavLink 
                                exact to="/" 
                                activeStyle={{fontSize: "1.2em", fontWeight: 700}}
                                onClick={this.handleMenuIcon}
                                >Home</NavLink></li>

                        <li>
                            <NavLink 
                                to="/shop" 
                                activeStyle={{fontSize: "1.2em", fontWeight: 700}}
                                onClick={this.handleMenuIcon}
                                >Shop</NavLink>
                        </li>

                        {TokenService.hasAuthToken() ? <li>
                            <NavLink 
                                to="/user" 
                                activeStyle={{fontSize: "1.2em", fontWeight: 700}} onClick={this.handleMenuIcon}>Profile</NavLink>
                        </li> : ''}

                        {TokenService.hasAuthToken() ? 
                        <li>
                            <Link 
                                to="/" 
                                className="logging-link" 
                                onClick={this.handleLogOut}
                                >Log Out</Link></li> : this.renderLogin()}
                    </ul>
                </nav>
            </header>
        )
    }
}