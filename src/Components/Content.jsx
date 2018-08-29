import React, { Component } from 'react';
import Login from './Login/Login.jsx';
import '../styles/Content.css';
import FolderIconOff from '../assets/folder_off@2x.png';
import FolderIconOn from '../assets/folder_on@2x.png';
import { Route, BrowserRouter as Router, withRouter } from 'react-router-dom';
import ContentImages from './ContentImages.jsx';

let folderObject = [{foldername: "Flower", icon: FolderIconOff, isToggled: false}, 
                    {foldername: "Cars", icon: FolderIconOff, isToggled: false},
                    {foldername: "Cards", icon: FolderIconOff, isToggled: false},
                    {foldername: "Science", icon: FolderIconOff, isToggled: false}];

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            folderArray: folderObject,
            contentFolder: [],
            currIndex: -1,
            showComponent: false,
        }
        this.addFolder = this.addFolder.bind(this);
        this.onFolderClick = this.onFolderClick.bind(this);
    }
        
//    addFolder = (event) =>{
//        let imageFolder = [];
//        imageFolder=  this.state.folderArray;
//        imageFolder.push({
//            foldername: "Placeholder",
//            icon: folderIconOff,
//        });
//        this.setState( {folderArray: imageFolder} );
//        console.log(this.state.folderArray.length);
//    }
    
    pushURL = () => {
        this.props.history.push({
            pathname: '/user/content/' + this.state.folderArray[this.state.currIndex].foldername,
            state: {folderIndex : this.state.folderArray[this.state.currIndex]}
        });
    }
    
    addFolder = () => {
      this.setState(oldState => ({
        folderArray: oldState.folderArray.concat({
            foldername: "Placeholder",
            iconOn: FolderIconOff,
        })
      }))
        console.log(this.state.folderArray.length);
    }
    
    // Handle click on folder
    onFolderClick = (event, index) =>{
        let array = this.state.folderArray;
        // If there's no folder toggled, toggle folder and set state
        if(this.state.currIndex == -1){
            this.toggleFolder(array, index);
        }
        // Swap toggled folder index with click index
        else if(this.state.currIndex != index){
            this.toggleFolder(array, this.state.currIndex);
            this.toggleFolder(array, index); 

        }
        this.setState({
            currIndex: index,
            folderArray: array,
            showComponent: true,
        })
    }
    
    // Helper function
    toggleFolder = (array, index)=> {
        array[index].isToggled = !array[index].isToggled;
    }
    
    render(){
        let allFolders = this.state.folderArray;
        let mappedArray = allFolders.map((value, index) =>{
            return(
                <div key = {index} onClick = {(event) => this.onFolderClick(this, index)} className = "folderStyle">
                    {  
                        (this.state.folderArray[index].isToggled) ? 
                        ( 
                            <div>
                                <img className = "folder" src= {FolderIconOn} alt = "folder"/> 
                                <p className = "folderTextOn">{value.foldername}</p>    
                            </div>
                        )
                        : 
                        ( 
                            <div>
                                <img className = "folder" src= {FolderIconOff} alt = "folder"/>
                                <p className = "folderTextOff">{value.foldername}</p>
                            </div>
                        )
                    }
                </div>
            )
        });
              
        return(
            <div className = "componentBackground">
                <div className = "folderTab">
                    {mappedArray}
                </div>
                <div>
                    <button onClick = {this.addFolder}>add</button>
                </div>
                <div>
                    <h4>Content</h4>
                    {(this.state.showComponent) ? <div> <ContentImages folderArray = {this.state.folderArray[this.state.currIndex]} currIndex = {this.state.currIndex} /> </div> : null}
                </div>
            </div>
        );
    }
}

export default Content;