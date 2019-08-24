import React from 'react';
import "./shoe.css";
const ColorPicker = require("a-color-picker");


export default class Shoe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color: [
                "red", 
                "orange", 
                "yellow", 
                "green", 
                "blue", 
                "indigo", 
                "violet"
            ],
            layer: {
                top: "#BCBEC0",
                middle: "#636466",
                bottom: "#B0D1E0"
            },
            size: 1

        }
    }

    componentDidMount(){  

        const e = document.getElementsByClassName("logging-link");

        Array.from(e).map( (anchor, index) => {
            anchor.addEventListener("click", (event)=>{
                for(let i = 0; i < e.length; i++){
                    if( i != index){
                        e[i].innerHTML = "hello"
                    }
                    e[index].innerHTML = "ok"
                }
            })
        })


        document.querySelector(".top").style.fill = "lightgrey";
        this.hoverLayer();
        this.handleColorChange();
    }

    hoverLayer = (e) => {
        document.querySelectorAll("path").forEach( layer => {
            
            layer.addEventListener("mouseover", ()=>{
                layer.style.opacity = .7;
            });
            layer.addEventListener("mouseout", ()=>{
                layer.style.opacity = 1;
            });

            layer.addEventListener("click", (e)=>{
                const layer = document.querySelector("#color-picker");
                console.log(e.target.className.animVal.split(" ")[0] + "-color")
                this.setState({ layer: e.target.className.animVal.split(" ")[0] + "-color"});
                layer.style.display = "block";
                layer.style.top =  `${e.clientY / 18}em`;
                layer.style.left = `${e.clientX / 23}em`

            })
        })
    }

    renderSizes = ()=>{
        let sizes = [];

        for(let i = 1; i <= 12; i += .5){
            sizes.push(i);
        };

        return sizes.map( size => <option key={size} value={size}>{size}</option>);

    }

    selectSize = (e) =>{
        this.setState({ size: e.target.value});
    }

    handleColorChange = () =>{
        ColorPicker.from("#color-wheel")
            .on("change", (picker, color)=>{
                
                const layer = this.state.layer.split("-")[0];
                console.log(this.state.layer)
                console.log(layer);
                document.querySelector(`.${this.state.layer}`).style.backgroundColor = color;
                document.querySelector(`.${layer}`).style.fill = color;
                
            })
    }

    layerColor = (e) => {
        const layerClassName = e.target.className.split(' ');
        const colorPicker = document.querySelector("#color-picker");

        colorPicker.style.display = "block";
        colorPicker.style.top = `${e.clientY / 21}em`;
        colorPicker.style.left = `${e.clientX / 26}em`;
        this.setState({ layer: layerClassName[0]})
    }

    closeColorPicker = ()=>{
        document.querySelector("#color-picker").style.display = "none";
    }

    render(){
        return (
            <section id="SVG-container">
                <svg  version="1.1" id="SVG" width="2560" height="1080" viewBox="0 0 216 166.027">

                    <path className="bottom layer" fill="#B0D1E0" d="M216,82.568c-0.013-4.393-2.253-8.503-6.449-12.699c1.111-8.4,0.559-27.178-5.099-43.148
                        c-4.747-13.419-13.099-24.856-27.089-26.489c-1.128-0.132-2.293-0.2-3.495-0.2c-5.099-0.368-11.571,2.417-19.423,9.856
                        c-5.537-5.847-13.597-9.566-23.513-9.566c-21.168,0-29.333,22.679-43.847,48.379C74.667,70.694,54.274,87.593,36.145,99.591
                        c-3.057,2.023-6.051,3.91-8.931,5.656c-14.465,8.768-22.257,14.037-25.45,23.414C0.548,132.222,0,136.373,0,141.533
                        c13.607,13.607,41.125,24.494,88.9,24.494s57.908-36.74,66.826-45.662c4.461-4.459,9.148-3.173,15.441-2.889
                        c6.294,0.283,14.194-0.436,25.08-8.904C209.855,97.99,216.021,89.888,216,82.568z"/>
                    <path className="middle layer" fill="#636466" d="M215.995,82.963c0.136-4.554-2.111-8.794-6.443-13.126c-14.978-0.684-27.862,4.481-39.18,12.396
                        c-5.725-4.014-26.543-18.252-40.223-22.702c1.56-1.256,3.039-2.276,4.413-2.998c4.612-2.431,9.226-4.663,13.344-6.84
                        c20.824,23.772,56.547,8.836,56.547-23.005C199.323,12.188,189.984,0,173.869,0c7.569,0.54,12.105,8.024,13.606,17.526
                        c2.722,17.236-12.999,26.308-24.792,18.143c1.126-9.801-1.937-19.182-8.237-25.813c-5.537-5.847-13.597-9.566-23.513-9.566
                        c-21.168,0-29.333,22.679-43.847,48.378C74.667,70.662,54.274,87.562,36.145,99.559c11.934-4.626,38.545,2.936,48.823,2.936
                        c4.336,0,11.349-6.867,19.055-15.367c13.149,4.513,30.988,15.748,39.27,20.77c-12.536,14.486-22.928,28.864-32.621,34.512
                        c-22.796,13.289-62.148,5.452-72.118,3.629s-19.957-28.104-36.79-17.408C0.548,132.19,0,136.34,0,141.501
                        c13.607,13.607,41.125,24.493,88.9,24.493s57.908-36.74,66.826-45.661c8.921-8.918,18.75,5.144,40.521-11.793
                        C209.591,98.163,215.779,90.171,215.995,82.963z M152.356,97.945c-8.451-6.613-30.521-19.037-38.926-21.399
                        c1.982-2.232,3.955-4.437,5.892-6.527c11.707,3.016,33.496,17.168,39.77,21.346C156.778,93.482,154.533,95.691,152.356,97.945z"/>
                    <path className="top layer" transform="translate(55, 65) rotate(-50)" fill="#BCBEC0" d="M103.541,40.272c-2.588-3.765-5.356-7.247-8.247-10.455c-2.924-3.246-5.974-6.209-9.092-8.911
                        c0.023-0.249,0.045-0.498,0.063-0.751c0.376-5.109-0.167-10.904-2.227-17.483C83.527,1.036,82.014-0.01,80.384,0
                        c-0.369,0.002-0.743,0.058-1.114,0.174c-2.007,0.626-3.125,2.761-2.499,4.768c1.165,3.73,1.738,7.038,1.922,10.039
                        c-0.813-0.584-1.627-1.151-2.442-1.701C69.705,8.855,63.124,5.478,56.968,3.021c-1.418-0.566-3.023-0.236-4.104,0.845
                        c-1.08,1.08-1.408,2.685-0.842,4.104c1.255,3.133,1.913,6.558,2.148,10c-4.934-3.09-9.956-6.163-14.8-9.276
                        c-1.018-0.653-2.288-0.785-3.417-0.353c-1.129,0.432-1.988,1.377-2.31,2.542c-0.683,2.483-1.626,4.919-2.723,7.278
                        c-3.357-2.18-6.752-4.232-10.03-6.035c-3.048-1.676-5.993-3.142-8.733-4.309c-2.747-1.165-5.272-2.04-7.612-2.507
                        C4.273,5.254,4,5.231,3.731,5.236c-1.4,0.027-2.699,0.827-3.337,2.124C0.131,7.892,0.003,8.461,0,9.025
                        c-0.005,1.077,0.447,2.134,1.297,2.88c1.596,1.397,3.177,2.974,4.691,4.655c3.826,4.24,7.213,9.157,9.415,13.446
                        c1.101,2.139,1.904,4.125,2.334,5.701c0.217,0.786,0.34,1.467,0.383,1.983c0.046,0.516,0.005,0.859-0.025,0.971
                        c-0.417,1.768,0.474,3.582,2.125,4.336c0.547,0.249,1.127,0.359,1.697,0.341c1.152-0.036,2.261-0.594,2.971-1.58
                        c1.146-1.591,2.514-3.433,3.97-5.479c1.527-2.146,3.15-4.521,4.728-7.09c0.71,0.51,1.412,1.022,2.102,1.535
                        c2.788,2.069,5.402,4.151,7.695,6.135c2.292,1.982,4.263,3.874,5.746,5.521c0.838,0.929,1.519,1.781,2.006,2.493
                        c0.803,1.172,2.186,1.796,3.595,1.627c1.411-0.171,2.604-1.107,3.105-2.436c0.057-0.16,1.996-5.304,3.18-12.591
                        c5.053,3.447,9.62,6.903,13.282,10.394c0.922,0.877,2.205,1.234,3.447,0.958c1.243-0.275,2.254-1.142,2.719-2.326
                        c0.835-2.13,1.822-4.447,2.755-7.004c0.449-1.227,0.882-2.512,1.28-3.859c1.75,1.664,3.468,3.42,5.14,5.276
                        c2.675,2.969,5.235,6.188,7.628,9.671c0.785,1.142,2.082,1.722,3.371,1.645c0.667-0.04,1.332-0.256,1.922-0.662
                        C104.292,44.375,104.732,42.006,103.541,40.272z M26.9,25.535c-0.998,1.61-2.027,3.153-3.046,4.625
                        c-1.158-2.829-2.765-5.827-4.702-8.854c-0.49-0.762-1.003-1.526-1.532-2.289c0.142,0.08,0.284,0.155,0.427,0.235
                        c3.01,1.684,6.147,3.6,9.25,5.63C27.164,25.098,27.034,25.32,26.9,25.535z M52.647,34.622c-0.028,0.119-0.055,0.232-0.083,0.349
                        c-0.781-0.772-1.612-1.557-2.49-2.352c-3.095-2.804-6.754-5.741-10.688-8.624c-0.689-0.505-1.389-1.008-2.093-1.508
                        c0.751-1.54,1.455-3.131,2.089-4.771c4.914,3.089,9.859,6.113,14.577,9.122C53.652,29.711,53.161,32.381,52.647,34.622z
                        M77.24,27.341c-0.534,1.836-1.174,3.601-1.85,5.337c-4.093-3.39-8.694-6.62-13.533-9.799c0.043-1.35,0.045-2.728-0.015-4.127
                        c-0.077-1.785-0.252-3.604-0.542-5.43c3.51,1.765,7.105,3.841,10.69,6.263c2.032,1.374,4.06,2.859,6.067,4.453
                        C77.827,25.17,77.551,26.268,77.24,27.341z M216,23.268h-0.007V23.26H216V23.268z"/>
                    </svg>
                    
                    <label id="size-label" htmlFor="sizeSelect">Size: 
                        <select id="sizeSelect" value={this.state.size} onChange={this.selectSize}>
                            {this.renderSizes()}
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
            </section>
        )
    }
}