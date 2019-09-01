import React from "react";
import UserService from "../../services/UserService";

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: ""
        }
    }

    componentDidMount(){
        UserService.getUser()
            .then( res => this.setState(res))
    }


    render(){
        return (
            <section id="profile-section">
                <h1>Hello {this.state.first_name}</h1>
            </section>
        )
    }
}