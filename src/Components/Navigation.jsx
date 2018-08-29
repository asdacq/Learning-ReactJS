import React, { Component } from 'react';
import Login from './Login/Login.jsx';
import Avatar from '../assets/avatar.png';
import '../styles/Navigation.css';
import Content from './Content.jsx';
import { Route, BrowserRouter as Router } from 'react-router-dom';

class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            location : "151 Pro-Serv",
            orgToggle: false,
            //id: this.props.location.state.id,
            id: 'Henry@test.com',
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (event) =>{
        if(this.state.orgToggle == false){
            this.setState({orgToggle : !this.state.orgToggle});
        }
        this.props.history.push({pathname: '/user/content'});
    }
    
    render(){
        return(
            <div>
                <ul className = "navbar">
                    <div className = "keepRow">
                        <li><span className = "homeBox" ></span></li>
                        <li><span className = "videriFont">VIDERI</span></li>
                        { (!this.state.orgToggle) ? 
                            (
                                <li onClick = {this.handleClick} > <span className = "organizationFont">Organization</span> <span>{this.state.location}</span></li>
                            ) 
                            : 
                            ( 
                                <li onClick = {this.handleClick} className = "highlight"> <span className = "organizationFont">Organization</span><span>{this.state.location}</span></li>
                            )

                        }
                    </div>
                    <div>
                        <li className = "twoInOne">{this.state.id} <span className = "spaceBetweenAvatar"><img src = {Avatar} className = "avatar" alt ="placeholder" /></span> </li>
                    </div>   
                </ul>
            </div>
        );
    }
}

export default Navigation;