import React from 'react';
import './App.css';
import Header from './components/header/Header';
import {Route} from 'react-router-dom';
import Shoe from './Shoe';

class App extends React.Component{
  
  render(){
    return (
      <section id="main-section">
        <Route path="/" component={Header}></Route>
        <Shoe className="shoe-svg" fill="orange"/>
      </section>
    )
  }
}

export default App;
