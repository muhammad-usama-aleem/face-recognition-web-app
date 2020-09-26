import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import LinkForm from './Components/LinkForm';
import Rank from './Components/Rank';
import './App.css';

const particleopt = {
  particles:{
    number:{
      value:30,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
    }
  }
  onInputChange=(event)=>{
    console.log(event.target.value);
  }
  onButtonSubmit = () =>{
    console.log('click');
  }
  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particleopt} />
        <Navigation />
        <Logo />
        <Rank />
        <LinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
  
      </div>
    );
  }

}

export default App;
