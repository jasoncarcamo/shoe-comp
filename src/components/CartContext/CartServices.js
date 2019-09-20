import TokenService from "../../services/TokenService";


const CartServices = {
    getCart(){
        return fetch("https://salty-brushlands-63375.herokuapp.com/user/checkout", {
            headers: {
                'conent-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }            
        })
            .then( res =>{
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
    },
    placeOrder(items){
        return fetch("https://salty-brushlands-63375.herokuapp.com/user/order", {
            method: "POST",
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
    }, 
    cartFunctions(method, items){

        return fetch("https://salty-brushlands-63375.herokuapp.com/user/checkout", {
            method,
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(items)
        })
            .then( res => {
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
    },
    deleteCart(){
        return fetch("https://salty-brushlands-63375.herokuapp.com/user/checkout", {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => {
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
    }
};



export default CartServices;