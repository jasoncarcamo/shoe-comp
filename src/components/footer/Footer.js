import React from "react";
import "./footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import {faTwitter} from "@fortawesome/free-brands-svg-icons"

export default class Footer extends React.Component{
    render(){
        return (
            <footer>
                <FontAwesomeIcon id="footer-facebook" icon={faFacebookF}></FontAwesomeIcon>
                <FontAwesomeIcon id="footer-instagram" icon={faInstagram}></FontAwesomeIcon>
                <FontAwesomeIcon id="footer-twitter" icon={faTwitter}></FontAwesomeIcon>
            </footer>
        );
    }
}