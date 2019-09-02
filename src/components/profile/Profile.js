import React from "react";
import UserService from "../../services/UserService";

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

    componentWillMount(){
        this.setState({isMounted: true});
    }

    componentDidMount(){
        if(this.state.isMounted){
            UserService.getUser()
                .then( res => {
                    this.setState(res)                
                });

            UserService.getOrders()
                .then( data => {
                    this.formatData(data)
                })
                .catch(error => {
                    this.setState({ error: error.error})
                })
        }
    }

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

            console.log(formatData)


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
            };

            orders[index].items = JSON.parse(formatData)

        });
        this.setState({orders})

    }

    componentWillUnmount(){
        this.setState({ isMounted: false});
    }

    renderOrders = ()=>{
        const orders = this.state.orders;

        return orders.map( (order, index) => {
            let li = [];

            for( let i = 0; i < order.items.length; i++){
                console.log(order.items[i])
                li[i] = (
                    <li key={index+"-"+ i}>
                        {order.items[i].top}
                    </li>
                )
            };
            
            return li;
        })
    }

    render(){
        console.log(this.state.orders)
        return (
            <section id="profile-section">
                <h1>Hello {this.state.first_name} {this.state.last_name}</h1>
                <ul>
                    {this.renderOrders()}
                </ul>
            </section>
        )
    }
}