import TokenService from "./TokenService";

const UserService = {

    register(form){
        
        return fetch("https://salty-brushlands-63375.herokuapp.com/api/register", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then( res =>{
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            });
    },
    login(form){

        return fetch("https://salty-brushlands-63375.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then( res => {
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
    },
    getUser(){
        return fetch("https://salty-brushlands-63375.herokuapp.com/user", {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => {
                return !res.ok ? res.json().then(e => {
                    return Promise.reject(e)}) : res.json()
            })
    },
    getOrders(){
        return fetch("https://salty-brushlands-63375.herokuapp.com/user/order", {
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



export default UserService;