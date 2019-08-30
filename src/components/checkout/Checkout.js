import React from "react";
import CartContext from "../CartContext/CartContext";




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
            return null;
        }

        return orders.map( (order, index)=> {
            const removeItem = ()=>{
                this.context.removeItem(index)
            }

            const clearCheckout = ()=>{
                this.context.clearCheckout();
            };

            return (
            <li key={index}>

                <span>Order: {index}</span>

                <div>
                    <button type="button">Edit</button>
                    <button type="button" onClick={removeItem}>Remove Item</button>
                </div>
                
                <button type="button" onClick={clearCheckout}>Cancel order</button>

            </li>)});
            
    }

    render(){
        console.log(this.context.items)
        return (
            <ul>
                {this.renderEditSelection()}
            </ul>
        )
    }
}