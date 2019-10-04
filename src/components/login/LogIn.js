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
            isLoading: false,
            error: ''
        };
    };

    componentDidMount(){
        if(TokenService.hasAuthToken()){
            this.props.history.push("/user");
        };
    }

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    };

    handlePassword = (e)=>{
        this.setState({ password: e.target.value});
    };

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState({ isLoading: true});
        UserService.login({email: this.state.email, password: this.state.password})
            .then(resData => {
                    TokenService.saveAuthToken(resData.authToken);
                    this.setState({ isLoading: false})
                    this.props.history.push("/user")
            })
            .catch(err => this.setState({ error: err.error, isLoading: false}))
    }

    handleSignUpLink = (state)=>{
        let errors = this.state.error.split(" ");
        let here;

        if(errors[errors.length - 1] === "here."){
            here = errors.pop();
            errors = errors.join(" ")
            return <span id="login-error">{errors}<Link to="/register"> {here}</Link></span>;
        };

        return <span id="login-error">{state.error}</span>;
    }

    renderLogin = ()=>{
        if(this.state.isLoading){
            return <p style={{textAlign: "center"}}>Loading...</p>;
        } else{
            return <button type="submit" id="login-submit">Log In</button>;
        }
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
                    
                    {this.state.error ? this.handleSignUpLink(this.state) : (<span id="login-error">Not registered? Sign up <Link to="/register">here</Link></span>)}    

                    {this.renderLogin()}
                    </fieldset>
                </form>
            </section>
        )
    }
}