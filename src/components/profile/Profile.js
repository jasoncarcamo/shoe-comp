import React from "react";
import UserService from "../../services/UserService";
import Shoe from "../shoe/Shoe";
import "./profile.css";
import {Link} from "react-router-dom";
import dateFormat from "dateformat"


export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            orders: [],
            isMounted: false,
            error: ""
        }
    }

    componentDidMount(){
        
        UserService.getUser()
            .then( res => {
                this.setState(res);               
            })
            .catch( error => this.setState({ error: error.error}))

        UserService.getOrders()
            .then( data => {
                console.log(data);
                this.formatData(data)
            })
            .catch(error => {
                return this.setState({ error: error.error})
            });
    
    }

    
    componentWillUnmount(){
        this.setState({
            first_name: "",
            last_name: "",
            orders: [],
            isMounted: false,
            error: ""
        });
    };

    formatData = (data)=>{

        let orders = data;
        orders.forEach((order, index)=>{

            let formatData = order.items.split("");

            if(formatData[0] === "{" && formatData[formatData.length - 1] === "}"){
                formatData.shift();
                formatData.pop();
                formatData.shift();
                formatData.pop();
            };

            for(let i = 0; i < formatData.length; i++){
                if(formatData[i] === ("\\")){
                    formatData.splice(i, 1);                
                };
    
                if(formatData[i] === "}" && formatData[i + 1] === "\""){
                    formatData.splice(i + 1, 1);
                }
    
                if(formatData[i] === "}" && formatData[i + 2] === "\""){
                    formatData.splice(i + 2, 1);
                }
            };

            formatData = formatData.join("");

            formatData = "[" + formatData + "]";

            if(formatData === "[{}]"){
                return this.setState({ orders: []});
            };

            orders[index].items = JSON.parse(formatData)

        });
        this.setState({orders})

    }

    renderOrders = ()=>{
        const orders = this.state.orders;

        return orders.map( (order, index) => {
            let li = [];
            let ul;

            for( let i = 0; i < order.items.length; i++){
                
                li[i] = (
                    <li key={index+"-"+ i} className="profile-orders">

                        <h4>Shoe: {i + 1}</h4>
                        <Shoe className="checkout-SVG" top={order.items[i].top} middle={order.items[i].middle} bottom={order.items[i].bottom}></Shoe>

                        <div>
                            <p>Size: {order.items[i].size}</p>

                            <p>Quantity: {order.items[i].quantity}</p>
                            <p>Date ordered: {dateFormat(order.date_created, "mmm dd yyyy")}</p>
                        </div>

                    </li>
                )
            };

            ul = (
                <ul key={index} className="profile-order-container">

                    <h4 className="profile-order-header" onClick={this.toggleOrders}>Order: {index + 1}</h4>

                    {li}
                </ul>
            )
            
            return ul;
        })
    }

    toggleOrders = (e)=>{
        const orders = document.querySelectorAll(".profile-orders");
        
        for(let i = 0; i < orders.length; i++){

            if(orders[i].parentNode === e.target.parentNode){
                if(orders[i].style.display !== "block"){
                    orders[i].style.display = "block";
                } else{
                    orders[i].style.display = "none";
                }
            } else{
                orders[i].style.display = "none";
            }
        }

    }
    render(){
        return (
            <section id="profile-section">

                <h1>Hello {this.state.first_name} {this.state.last_name}</h1>

                {this.state.orders.length === 0 ? <p id="profile-no-items">No items yet. Your first item will appear after you make you first <Link to="/shop">purchase</Link>.</p> : this.renderOrders()}
            </section>
        );
    };
};