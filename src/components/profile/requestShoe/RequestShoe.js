import React from 'react';
import CartContext from "../../CartContext/CartContext";
import {Link} from "react-router-dom";
import "./requestShoe.css";
import TokenService from "../../../services/TokenService";
import Shoe from "../../shoe/Shoe";
const ColorPicker = require("a-color-picker");



export default class RequestShoe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            layer: '',
            top: '',
            middle: '',
            bottom: '',
            size: 1,
            quantity: 1,
            screenWidth: window.innerWidth,
            error: ""
        }
    }

    static contextType = CartContext;

    componentDidMount(){
        window.addEventListener("resize", this.handleScreenWidth);
        this.resetState();
        this.hoverLayer();
        this.handleColorChange();
        this.randomColorHandler();
    };
    
    componentWillUnmount(){
        window.removeEventListener("resize", this.handleScreenWidth)
    }

    handleScreenWidth = ()=>{
        this.setState({ screenWidth: window.innerWidth})
    }

    resetState = ()=>{
        document.getElementsByClassName("top")[0].style.fill = "#BCBEC0";
        document.getElementsByClassName("middle")[0].style.fill = "#636466";
        document.getElementsByClassName("bottom")[0].style.fill = "#B0D1E0";

        document.getElementsByClassName("top-color")[0].style.backgroundColor = "#BCBEC0";
        document.getElementsByClassName("middle-color")[0].style.backgroundColor = "#636466";
        document.getElementsByClassName("bottom-color")[0].style.backgroundColor = "#B0D1E0";

        this.setState({
            layer: '',
            top: '#BCBEC0',
            middle: '#636466',
            bottom: '#B0D1E0',
            size: 1,
            quantity: 1
        });

    }

    hoverLayer = () => {
        Array.from(document.getElementsByClassName("layer")).forEach( layer => {
            
            layer.addEventListener("mouseover", ()=>{
                layer.style.opacity = .8;
            });
            layer.addEventListener("mouseout", ()=>{
                layer.style.opacity = 1;
            });

            layer.addEventListener("click", (e)=>{
                const layer = document.getElementById("color-picker");

                this.setState({ layer: e.target.className.animVal.split(" ")[0] + "-color"});
                
                layer.style.display = "block";
                layer.style.top =  `${window.innerHeight / 2}px`;
                layer.style.left = `${window.innerWidth / 2}px`

            });
        });
    };

    renderSizes = ()=>{
        let sizes = [];

        for(let i = 1; i <= 14; i += .5){
            sizes.push(i);
        };

        return sizes.map( size => <option key={size} value={size}>{size}</option>);

    };

    selectSize = (e) =>{
        this.setState({ size: e.target.value});
    };

    renderQuantity = ()=>{
        let quantity = [];

        for(let i = 1; i <= 12; i++){
            quantity.push(i);
        }

        return quantity.map( amount => <option key={amount}>{amount}</option>)
    }

    selectQuantity = (e)=>{
        this.setState({ quantity: e.target.value})
    }

    handleColorChange = () =>{
        ColorPicker.from("#color-wheel")
            .on("change", (picker, color)=>{
                
                const layer = this.state.layer.split("-")[0];
                document.querySelector(`.${this.state.layer}`).style.backgroundColor = color;
                document.querySelector(`.${layer}`).style.fill = color;

                this.setState({ [layer]: color});
                
            });
    };

    layerColor = (e) => {
        const layerClassName = e.target.className.split(' ');
        const colorPicker = document.getElementById("color-picker");

        colorPicker.style.display = "block";

        if(this.state.screenWidth <= 770){            
            colorPicker.style.top = `${window.innerHeight / 2 }px`;
            colorPicker.style.left = `${window.innerWidth / 2 }px`;
        } 
         else{
            
        colorPicker.style.top = `${e.clientY - 100}px`;
        colorPicker.style.left = `${e.clientX }px`;

        }

        this.setState({ layer: layerClassName[0]})
    };

    closeColorPicker = ()=>{
        document.getElementById("color-picker").style.display = "none";
    };

    randomColorHandler = () => {
        const randomButton = document.getElementById("random-color");
        const colorButtons = document.getElementsByClassName("color-layer");

        randomButton.addEventListener("click", ()=>{
            let randomNumbers = [];
        
            Array.from(colorButtons).forEach( (button, index) => {
                
            for(let i = 0; i < 3; i++){
                randomNumbers[i] = (Math.floor(Math.random() * 256));

            };

            const findPath = document.getElementsByClassName(`${button.className.split('-')[0]}`);
            let thisLayer = findPath[0].className.baseVal.split(" ")[0];

            this.setState({[thisLayer]: `rgb(${randomNumbers.toString()})`});

            findPath[0].style.fill = `rgb(${randomNumbers.toString()})`;

            colorButtons[index].style.backgroundColor = `rgb(${randomNumbers.toString()})`
            });
        });
    };

    handleAddToCart = ()=>{

        if(!TokenService.hasAuthToken()){
            
            this.setState({ error: <span id="cart-error">You must <Link to="/login">log in</Link> to add items to your cart. Or you can register <Link to="/register">here.</Link></span>});

            return;
        }

        this.context.addItem({
            top: this.state.top,
            middle: this.state.middle,
            bottom: this.state.bottom,
            size: this.state.size,
            quantity: this.state.quantity
        });

        this.resetState();
    }

    render(){
        return (
            <section id="SVG-container">

                <Shoe className="SVG" top="#BCBEC0" middle="#636466" bottom="#B0D1E0"></Shoe>
                    
                    <label id="size-label" htmlFor="sizeSelect">Size: 
                        <select id="sizeSelect" value={this.state.size} onChange={this.selectSize}>
                            {this.renderSizes()}
                        </select>
                    </label>

                    <label id="quantity-label" htmlFor="quantitySelect">Quantity:  
                        <select id="quantitySelect" value={this.state.quantity} onChange={this.selectQuantity}>
                            {this.renderQuantity()}
                        </select>
                    </label>

                    <div id="color-picker">

                        <div onClick={this.closeColorPicker}>X</div>

                        <div id="color-wheel"></div>
                    </div>
                    
                    <div id="color-container">
                        <div className="top-color color-layer" onClick={this.layerColor}></div>
                        <div className="middle-color color-layer" onClick={this.layerColor}></div>
                        <div className="bottom-color color-layer" onClick={this.layerColor}></div>
                    </div>
                    <button id="random-color" type="button">Randomize</button>
                    <button id="add-checkout" type="button" onClick={this.handleAddToCart}>Add to checkout</button>

                    <h5 id="not-logged-in">{this.state.error ? this.state.error : ""}</h5>
            </section>
        )
    }
}