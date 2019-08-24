import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import TokenService from '../../services/TokenService';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
    }

    renderLogin = ()=>{
        if(TokenService.hasAuthToken()){
            return <li><Link to="/" className="logging-link">Log Out</Link></li>
        } else{
            return (
                <>  
                    <li><Link to="/register" className="logging-link">Sign Up</Link></li>
                    <li><Link to="/login" className="logging-link">Log In</Link></li>
                </>
            )
        }

    }

    render(){
        return (
            <header>
                
                <nav id="header-nav">
                    <ul className="logging-container">
                        {this.renderLogin()}
                    </ul>
                    
                    <h2>Icon</h2>

                    <ul id="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}