import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import Register from "../register/Register";
import LogIn from "../login/LogIn";
import Shoe from '../shoe/Shoe';
import Checkout from "../checkout/Checkout";

class App extends React.Component{
  
  render(){
    return (
      <section id="main-section">
        <Route path="/" component={Header}></Route>
        <Route exact path="/shop" component={Shoe}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={LogIn}></Route>
        <Route exact path="/checkout" component={Checkout}></Route>
      </section>
    )
  }
}

export default App;
