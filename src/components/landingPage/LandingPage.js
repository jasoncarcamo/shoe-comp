import React from "react";
import "./landingpage.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faEyeDropper, faWifi} from "@fortawesome/free-solid-svg-icons";
import Shoe from "../shoe/Shoe";


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentShoe: 0
        }
    }

    componentDidMount(){
        this.renderSlideShow();
    }
    
    renderColors = ()=>{
        let colors = [];

        for(let i = 0; i <= 2; i++){
            colors[i] = Math.floor(Math.random() * 256);
        }
        
        colors = `rgb(${colors.join(",")}`;

        return colors;
    }

    renderShoeExamples = ()=>{
        const shoeList = []; 

   
        for(let i = 0; i < 7; i++){
            shoeList[i] = (<li key={i} className="shoe-container">
                <Shoe className="shoe-example-SVG" top={this.renderColors()} middle={this.renderColors()} bottom={this.renderColors()}></Shoe>

            <p>What color scheme will you come up with?</p>
        </li>)
        };

        let currentShoe = -1;        
        setInterval(()=>{

            const shoes = document.getElementsByClassName("shoe-container");

            if(currentShoe === -1){
                currentShoe = 0;
            } else{
                currentShoe++;
            };

            if(currentShoe === 7){
                currentShoe = 0;
            };
            

            Array.from(shoes).forEach( (shoe, index) =>{
                shoe.style.display = "none";
                if(index === currentShoe){
                    shoe.style.display = "block";
                } 
            });
        }, 500);

        return shoeList;
    };

    renderSlideShow = () => {
        const shoes = document.getElementsByClassName("shoe-container");

        if(shoes){
            
        setTimeout(()=>{
        shoes[0].style.display = "block";
        }, 1);

        };
    };

    render(){
        
        return (
            <section id="landing-page-section">

                <section id="shoe-display-section">
                    <div id="shoe-display-container">
                        <Shoe className="landing-page-SVG" top="black" middle="purple" bottom="black"></Shoe>

                        <Link to="/shop" id="shop-now-button" type="button">Shop now</Link>
                    </div>
                </section>

                <section id="about-section">
                    <h1>Shoe Comp...</h1>
                    <p>...strives to bring aesthetics and durability together to create fashionable street wear.</p>
                </section>

                <section id="features-section">
                    <ul id="features-container">

                        <li>
                            <FontAwesomeIcon id="features-wifi-icon" icon={faWifi}></FontAwesomeIcon>
                            <h2>Order Online</h2>
                            <p>Select your size and easliy add your new shoe to your cart</p>
                        </li>
                        
                        <li>
                            <FontAwesomeIcon id="features-color-icon" icon={faEyeDropper}></FontAwesomeIcon>
                            <h2>Choose your color scheme</h2>
                            <p>Choose from thousands of color combinations. The only limit is your imagination</p>
                        </li>

                        <li>
                            <FontAwesomeIcon id="features-cart-icon" icon={faShoppingCart} ></FontAwesomeIcon>
                            <h2>Quick checkout</h2>
                            <p>Your cart will always contain your items unless removed by you</p>
                        </li>
                        
                    </ul>
                </section>

                <section id="third-section">
                    <Shoe className="third-section-SVG" top="orange" middle="gold" bottom="blue"></Shoe>  
                    <p>Breatheable, Colorful, and Aesthetic</p>
                </section>

                <section id="shoe-examples-section">
                    <ul>
                        {this.renderShoeExamples()}
                    </ul>
                </section>

                <Link className="get-started-button" to="/shop">Get started</Link>
            </section>
        )
    }
}