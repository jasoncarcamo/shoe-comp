import React from "react";
import CartContext from "../CartContext/CartContext";
import "./checkout.css";
import Shoe from "../shoe/Shoe";




export default class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: []
        };

    }

    
    static contextType = CartContext;

    componentDidMount(){
        console.log(this.props)
    }

    renderEditSelection = ()=>{

        const orders = this.context.items;
        
        if(orders.length === 0){
            return <span id="no-items">No items in your cart.</span>;
        };

        return orders.map( (order, index)=> {

            const removeItem = ()=>{
                this.context.removeItem(index)
            };

            return (
            <li key={index} className="checkout-item">

                <h3>Order: {index + 1}</h3>
                <Shoe top={order.top} middle={order.middle} bottom={order.bottom}></Shoe>
                <p>Size: {order.size}</p>
                <p>Quatity: {order.quantity}</p>
                <div className="checkout-button-container">
                    <button type="button" onClick={()=>{ this.props.history.push(`/editshoe?item=${index + 1}`)}}>Edit</button>
                    <button type="button" onClick={removeItem}>Remove</button>
                </div>

            </li>)});
    }

    handleCancelOrder = ()=>{
        this.context.clearCheckout();
    }

    render(){
        
        return (
            <section id="checkout-section">
                <ul>
                    {this.renderEditSelection()}
                    {this.context.items.length !== 0 ? <button id="checkout-cancel-order" type="button" onClick={this.handleCancelOrder}>Cancel order</button> : ""}
                </ul>
            </section>
        )
    }
}