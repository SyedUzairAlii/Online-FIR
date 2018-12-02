import React, { Component } from 'react';
import Routers from './Router/Route';
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {

  render() {
    return (
    
      //Routers
      
      <Provider store = {store}>
        <Routers />   
      </Provider>
    );
  }
}

export default App;
