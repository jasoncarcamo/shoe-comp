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

                <div className="checkout-items">
                    <div className="checkout-features">
                        <button className="checkout-remove-item" type="button" onClick={removeItem}><span>-</span></button>

                        <Shoe className="checkout-SVG" top={order.top} middle={order.middle} bottom={order.bottom}></Shoe>

                        <button type="button" onClick={()=>{ this.props.history.push(`/editshoe?item=${index + 1}`)}}>Edit</button>
                    </div>
                    
                    <div className="checkout-item-info">
                        <p>Size: {order.size}</p>
                        <p>Quatity: {order.quantity}</p>
                    </div>
                </div>

            </li>)});
    }

    renderOrderButtons = ()=>{
        return (
            <>
                <button id="checkout-place-order" type="buton" onClick={this.handlePlaceOrder}>Place order</button>
                <button id="checkout-cancel-order" type="button" onClick={this.handleCancelOrder}>Cancel order</button>
            </>
        )
    }

    handleCancelOrder = ()=>{
        this.context.clearCheckout();
    }

    handlePlaceOrder = ()=>{
        this.context.placeOrder();
        this.props.history.push('/user');
    }

    render(){
        
        return (
            <section id="checkout-section">
                <ul>
                    {this.renderEditSelection()}
                    {this.context.items.length !== 0 ? this.renderOrderButtons() : ""}
                </ul>
            </section>
        )
    }
}