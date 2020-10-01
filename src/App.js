import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import LinkForm from './Components/LinkForm';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'bda1e2ceac664d62a6185f6296b61509'
})
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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calcultelocation = (data) => {
    const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("Face", Face);
    return{
      leftCol: Face.left_col * width,
      topRow: Face.top_row * height,
      rightCol: width - (Face.right_col * width),
      bottomRow: height - (Face.bottom_row * height)
    }
  }

  displayFaceBox(box){
    console.log(box);
    this.setState({box})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});

  }
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    // console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>this.displayFaceBox(this.calcultelocation(response))
      .catch(err => console.log(err))
      );
    }

    
  render(){
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App">
        <Particles className="particles" params={particleopt} />
        {/* <SignIn /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <LinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <SignIn onRouteChange={this.onRouteChange}/>
             : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }

}

export default App;
