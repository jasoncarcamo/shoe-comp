import React from "react";
import TokenService from "../../services/TokenService";

const CartContext = React.createContext({
    items: [],
    addItem: ()=>{},
    removeItem: ()=>{},
    cancelItems: ()=>{},
    error: ""
});

export default CartContext;

export class CartProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            hasInstance: null,
            error: ""
        }
    }

    componentDidMount(){
        fetch("http://localhost:8000/user/order", {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res =>{
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json();
            })
            .then( data => {

                this.formatData(data.data.items);
                if(data){
                    this.setState({ hasInstance: true})
                }
            })
            .catch(error => this.setState({ error}));

    }

    addItem = (item)=>{
        let items = this.state.items;
        let methodType;

        if(items.length === 0){
            items[0] = item;
            methodType = "POST";
        } else{
            items.push(item);
            methodType = "PATCH"
        };
        
        if(this.state.hasInstance){
            methodType = "PATCH"
        };

        fetch("http://localhost:8000/user/order", {
            method: methodType,
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({items})
        })
            .then( res => {
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
            .then( data => {
                this.formatData(data.items);
            })
            .catch( error => console.log(error));

    }

    formatData = (data)=>{

        let formatData = data.split("");
        if(formatData[1] === "\"" && formatData[formatData.length - 2] === "\""){
            formatData.shift();
            formatData.pop();
            formatData.shift();
            formatData.pop();
        }

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
            return this.setState({ items: []});
        }
        
        formatData = JSON.parse(formatData);

        this.setState({ items: formatData});

    }

    removeItem = (index) => {
        const orders = this.state.items;
        orders.splice(index, 1);

        fetch("http://localhost:8000/user/order", {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ items: orders})
        })
        .then( res => res.json())
        .then( data => {
            
            if(data.items === "{}"){
                return this.setState({ items: []})
            };

            this.setState({ items: orders});
        });

    }

    clearCheckout = () => {
        fetch("http://localhost:8000/user/order", {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => res.json())
            .then( data => {
                this.setState({ hasInstance: null});
            });

            this.setState({ items: []});
    }

    getItem = (index)=>{
        const item = this.state.items[index];
        
        return item;
    }

    editItem = (index, item)=>{
        const items = this.state.items;
        
        items[index] = item;

        this.setState({items})
    }

    render(){

        const value = {
            items: this.state.items,
            addItem: this.addItem,
            removeItem: this.removeItem,
            clearCheckout: this.clearCheckout,
            getItem: this.getItem,
            editItem: this.editItem,
            error: ""
        };

        return (
            <CartContext.Provider value={value}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}