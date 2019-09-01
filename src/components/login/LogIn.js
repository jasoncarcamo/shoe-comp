import React from "react";
import {Link} from "react-router-dom";
import "./login.css";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentInput: 1,
            email: "",
            password: "",
            error: ''
        };
    };

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    };

    handlePassword = (e)=>{
        this.setState({ password: e.target.value});
    };

    handleSubmit = (e)=>{
        e.preventDefault();

        UserService.login({email: this.state.email, password: this.state.password})
            .then(resData => {
                if(!resData.error){
                    TokenService.saveAuthToken(resData.authToken);
                    this.props.history.push("/user")
                };

                })
            .catch(err => this.setState({ error: err.error}))
    }

    handleSignUpLink = (state)=>{
        let errors = this.state.error.split(" ");
        let here;
        if(errors[errors.length - 1] === "here."){
            here = errors.pop();
            errors = errors.join(" ")
            return <span id="login-error">{errors} <Link to="/register">{here}</Link></span>;
        };

        return <span id="login-error">{state.error}</span>;
    }

    render(){
        return (
            <section id="login-section">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <fieldset>
                    
                    <label 
                        htmlFor="login-email">
                        Email: </label>
                    <input 
                        type="email" id="login-email" onChange={this.handleEmail}>
                    </input>

                    <label htmlFor="login-password">
                        Password:
                    </label>
                    <input type="password" id="login-password" onChange={this.handlePassword}></input>     
                    
                    {this.state.error ? this.handleSignUpLink(this.state) : ""}    

                    <button type="submit" id="login-submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}