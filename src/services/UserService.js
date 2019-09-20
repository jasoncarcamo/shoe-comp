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
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
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
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
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
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
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
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
            })
    }
};



export default UserService;