import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import Home from "../home/Home";
import Register from "../register/Register";
import LogIn from "../login/LogIn";
import Profile from "../profile/Profile";
import RequestShoe from '../profile/requestShoe/RequestShoe';
import Checkout from "../checkout/Checkout";
import EditShoe from "../editShoe/EditShoe";

class App extends React.Component{
  
  render(){
    return (
      <section id="main-section">
        <Route path="/" component={Header}></Route>
        <Route exact path="/shop" component={RequestShoe}></Route>
        <Route exact path="/user" component={Profile}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={LogIn}></Route>
        <Route exact path="/checkout" component={Checkout}></Route>
        <Route path="/editshoe" component={EditShoe}></Route>
      </section>
    )
  }
}

export default App;
