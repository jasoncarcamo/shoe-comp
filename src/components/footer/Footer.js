import React from "react";
import "./footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";


export default class Footer extends React.Component{
    render(){
        return (
            <footer>

                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon id="footer-facebook" icon={faFacebookF}></FontAwesomeIcon></a>

                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon id="footer-instagram" icon={faInstagram}></FontAwesomeIcon></a>

                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon id="footer-twitter" icon={faTwitter}></FontAwesomeIcon></a>
            </footer>
        );
    }
}