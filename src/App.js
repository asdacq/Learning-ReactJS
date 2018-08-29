import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import Content from './Components/Content.jsx';
import Navigation from './Components/Navigation.jsx';
import ContentImages from './Components/ContentImages.jsx';

class App extends Component {    
  render() {
    return (
        <div>
            <Router>
                <div>
                    <Route exact path = '/' component = {Login} />
                    <Route path = '/user' component = {Navigation} />
                    <Route path = '/user/content' component = {Content}/>
                </div>
            </Router>
        </div>
    );
  }
}

export default App;
