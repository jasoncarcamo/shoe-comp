import React from 'react';
import queryString from "query-string";
import CartContext from "../../CartContext/CartContext";
import "./editShoe.css";
import Shoe from "../../shoe/Shoe";
const ColorPicker = require("a-color-picker");



export default class EditShoe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: {}
        }
    }
     static contextType = CartContext;

    componentDidMount(){
        this.getItem();        
        this.hoverLayer();
        this.handleColorChange();
        this.randomColorHandler();
        this.setColors();
    }

    getItem = ()=>{

        const itemIndex = queryString.parse(this.props.location.search);
        
        this.setState(this.context.getItem(Number(itemIndex.item) - 1));
    }
    
    setColors = ()=>{
        
        document.getElementsByClassName("top-color")[0].style.backgroundColor = this.state.top;
        document.getElementsByClassName("middle-color")[0].style.backgroundColor = this.state.middle;
        document.getElementsByClassName("bottom-color")[0].style.backgroundColor = this.state.bottom;

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
                layer.style.top =  `${e.clientY / 18}em`;
                layer.style.left = `${e.clientX / 23}em`

            })
        })
    }

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
        colorPicker.style.top = `${e.clientY / 21}em`;
        colorPicker.style.left = `${e.clientX / 26}em`;
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

    handleEditItem = ()=>{
        const itemIndex = queryString.parse(this.props.location.search);

        this.context.editItem(Number(itemIndex.item) - 1, {
            top: this.state.top,
            middle: this.state.middle,
            bottom: this.state.bottom,
            size: this.state.size,
            quantity: this.state.quantity
        });

        this.props.history.push("/checkout");
    }

    handleCancelEdit = ()=>{
        this.props.history.push("/checkout")
    }


    render(){
        
        return (
            <section id="edit-section">
                <Shoe className="edit-SVG" top={this.state.top} middle={this.state.middle} bottom={this.state.bottom}></Shoe>

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
                    <div className="top-color color-layer" style={{backgroundColor: this.state.top}} onClick={this.layerColor}></div>
                    <div className="middle-color color-layer" style={{backgroundColor: this.state.middle}} onClick={this.layerColor}></div>
                    <div className="bottom-color color-layer" style={{backgroundColor: this.state.bottom}} onClick={this.layerColor}></div>
                </div>
                <button id="random-color" type="button">Randomize</button>
                <button id="add-checkout" type="button" onClick={this.handleEditItem}>Edit item</button>
                <button id="cancel-edit-button" type="button" onClick={this.handleCancelEdit}>Cancel</button>
                {this.state.error ? this.state.error : ""}
            </section>
        )
    }
}