const TokenService = {
    saveAuthToken(token){
        window.localStorage.setItem('shoe-comp-user', token);
    },
    getAuthToken(){
        return window.localStorage.getItem('shoe-comp-user');
    },
    clearAuthToken(){
        window.localStorage.removeItem('shoe-comp-user')
    },
    hasAuthToken(){
        return TokenService.getAuthToken()
    },
}

export default TokenService;