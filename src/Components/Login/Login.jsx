import React, { Component } from 'react';
//import { Router, Route, Redirect } from "react-router";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation.jsx';
import './Login.css';
import { validateForm } from './loginMethods.js'

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: 'henryhuang@test.com',
            password: 'HenryHuang1@',
            errors: [],
        };
        this.handeSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    
    
    handleSubmit = (event) =>{
        event.preventDefault();
        const {id, password} = this.state;
        const errors = validateForm(id,password);
        if(errors.length > 0){
            this.setState( {errors} );
            return;
        }
        else{
            this.props.history.push({
                pathname: '/user',
                state: {id : this.state.id}
            });
            //console.log(this.state.id);
        }
    }
    
    handleChange = (event) => {
        // Uses object literals to set state, since object literals have same name as value
        this.setState({ [event.target.name]: event.target.value });
        //console.log(event.target.name);
        //console.log(event.target.value);
        console.log(this.state);
    }
    
  render() {
    const {errors} = this.state;
    return (
        <div className = "loginStyle">
            <div className = "whiteBox">
                <div className = "innerBox">
                    <span className ="videriFontSize" >VIDERI</span> <span className = "orchestratorFontSize">ORCHESTRATOR</span>
                    <div className = "loginText"><strong>SIGN IN</strong></div>
                    <form onSubmit = {this.handleSubmit} >
                        <div className = "errorMessage">
                            {errors.map(error =>(<p key = {error}> {error} </p>))} 
                        </div>
                        <input type = "text" className = "textBox" placeholder = "ID"  onChange = {this.handleChange} name = "id" />
                        <input type = "text" className = "textBox" placeholder = "PASSWORD"  onChange = {this.handleChange} name = "password" />
                        <input type = "submit" className = "customSubmit" value = "Sign in" />
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
