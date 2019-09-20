import React from "react";
import {Link} from "react-router-dom";
import "./register.css";
import UserService from "../../services/UserService";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            password: "",
            passwordMatch: "",
            error: ""
        }
    }

    handleFirstName = (e)=>{
        this.setState({ first_name: e.target.value});
    };

    handleLastName = (e)=>{
        this.setState({ last_name: e.target.value});
    };

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    };

    validatePassword = (password) => {
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        if (password.length < 8) {
          return <span className="reg_pass_error" style={{color: 'red'}}>Password must be longer than 8 characters</span>
        }
        if (password.length > 72) {
          return <span className="reg_pass_error" style={{color: 'orange'}}>Password must be less than 72 characters</span>
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return <span className="reg_pass_error" style={{color: 'orange'}}>Password must not start or end with empty spaces</span>
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
          return <span className="reg_pass_error" style={{color: 'orange'}}>Password must contain one upper case, lower case, number and special character</span>
        }
        return <span className="reg_pass_error" style={{color: 'green'}}>Looking good!</span>
      }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value});
    };

    handlePasswordConfirm = (e)=>{
        this.setState({ passwordMatch: e.target.value})
    }

    handlePasswordMatch = ()=>{
        if(this.state.password === this.state.passwordMatch){
            return <span id="reg_passMatch" style={{color: "green"}}>Password matches.</span>;
        }

        return <span id="reg_passMatch" style={{color: "red"}}>Password does not match.</span>
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        UserService.register({first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password})
            .then( resData => {
                this.props.history.push("/login");
            })
            .catch( error => this.setState({ error: error.error}))
    }

    handleLoginLink = (state)=>{
        let errors = state.error.split(".");
        let loginHere;

        if(errors[errors.length - 2] === " Log in here"){
            for(let i = 1; i >= 0; i--){
                loginHere = errors.pop();
            };

            errors = errors.join("");
            
            return <span id="reg-error">{errors}. <Link to="login">{loginHere}</Link></span>;
        }

        return <span id="reg-error">{state.error}</span>;
        
    }

    render(){
        return (
            <section id="reg-section">
                <form id="reg-form" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="reg-first_name">First name: </label>
                        <input id="reg-first_name" type="text" onChange={this.handleFirstName} required></input>

                        <label htmlFor="reg-lat-name">Last name: </label>
                        <input id="reg-last-name" type="text" onChange={this.handleLastName} required></input>

                        <label htmlFor="reg-email">Email: </label>
                        <input id="reg-email" type="email" onChange={this.handleEmail} required></input>

                        <label htmlFor="reg-password">Password: </label>
                        <input id="reg-password" type="password" onChange={this.handlePassword} required></input>
                        {this.validatePassword(this.state.password)}

                        <label htmlFor="reg_pass_match">Retype password: </label>
                        <input id="reg_pass_match" type="password" onChange={this.handlePasswordConfirm} required></input>
                        {this.state.passwordMatch.length > 5 ? this.handlePasswordMatch() : ""}
                        <button id="reg-submit" type="submit">Register</button>
                        {this.state.error ? this.handleLoginLink(this.state) : ""}
                    </fieldset>
                </form>
            </section>
        )
    }
};