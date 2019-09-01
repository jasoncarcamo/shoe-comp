import TokenService from "./TokenService";

const UserService = {
    register(form){
        
        return fetch("http://localhost:8000/api/register", {
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

        return fetch("http://localhost:8000/api/login", {
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
        return fetch("http://localhost:8000/user", {
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