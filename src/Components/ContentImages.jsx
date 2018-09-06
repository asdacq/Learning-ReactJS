import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Content from './Content.jsx';
import Navigation from './Navigation.jsx';
import '../styles/ContentImages.css';
import {key} from '../config.js';
import apkIcon from '../assets/apk@2x.png';
import imageIcon from '../assets/image@2x.png';
import videoIcon from '../assets/video@2x.png';
import hiRes from '../assets/hi-res@2x.png';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

function getDate(){
    const currDate = new Date();
    return currDate.getFullYear() + "/" + (currDate.getMonth()+1) + "/" + currDate.getDay() + " " + currDate.getHours() + ":" + currDate.getMinutes();
}

function queries(index, key, query){
    var index = Math.round(Math.random());
    console.log(index);
    if(index % 2 == 0){
        return "https://pixabay.com/api/?key=" + key + "&q=" + query + "&image_type=all&per_page=10";
    }
    else{
        return "https://pixabay.com/api/videos/?key=" + key + "&q=" + query + "&video_type=all&per_page=10";
    }
}

class ContentImages extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            toggledIndex: 0,
            showModal: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal = () =>{
        this.setState({showModal:true});
    }
    
    afterOpenModal = () =>{
        console.log("hi");
    }
    
    closeModal = () =>{
        this.setState({showModal:false});
    }

    handleClick = (event, files, index) =>{
        files[index].isToggled = !files[index].isToggled;
        this.setState({files, showModal:true, toggledIndex: index});
    }
    handleClose = () => {
        this.setState({showModal:false});
    }
    
    fetchAPI = ( index, name) => {
    const keyJSON = JSON.stringify({key});
    const keyString = keyJSON.substr(8,33);
    const urlString = queries(index, keyString, name)
    fetch(urlString)
    .then( results => {
        return results.json();
    }).then(data => {
        const files = data.hits.map((item, index) => {
            const isVideo = (urlString.includes("video"));
            const isHorizontal = isVideo ? item.videos.small.width > item.videos.small.height : item.webformatWidth > item.webformatHeight ;
            const src =  isVideo ? `https://i.vimeocdn.com/video/${item.picture_id}_1920x1080.jpg` :  item.webformatURL;
            const imageStyle = `itemStyle${isHorizontal ? 'Horizontal' : 'Vertical'}`;
            const duration = isVideo ? item.duration : null;
            const videoSrc = isVideo ? item.videos.large.url : null;
            const dimensions = isVideo ? `${item.videos.small.height} x ${item.videos.small.width}` : `${item.imageHeight} x ${item.imageWidth}`;
            const image = isVideo ? videoIcon : imageIcon;
            const name = isVideo ? `${item.id}.mp4` : `${item.id}.jpg`;
            return {
                name,
                src,
                imageStyle,
                isToggled: false,
                duration,
                dimensions,
                image,
                videoSrc,
            }
        })
        this.setState({files})
    })}
    
componentDidMount(){
    this.fetchAPI(this.props.currIndex, this.props.folderArray.foldername);
}
    
componentDidUpdate(previousProps, index){
    if(this.props.folderArray.foldername !== previousProps.folderArray.foldername){
        return this.fetchAPI(this.props.currIndex, this.props.folderArray.foldername);
    }
}
    
  render() {
    return (
        <div className = "contentFiles">
            {this.state.files.map((item, index) => (
            <div key = {index} onClick = {() => this.handleClick(this, this.state.files, index)} className = {this.state.files[index].isToggled ? "boxAroundOn" : "boxAroundOff"}>
                <Modal 
                    isOpen = {this.state.showModal}
                    onAfterOpen = {this.afterOpenModal}
                    onRequestClose = {this.closeModal}
                    contentLabel = "Test"
                    className = "modal-content"
                    overlayClassName = "overlayStyle"
                > 
                    { 
                        this.state.files[this.state.toggledIndex].videoSrc ? 
                        <video width = "400" height = "300" src = {this.state.files[this.state.toggledIndex].videoSrc} controls> </video> :
                        <img src = {this.state.files[this.state.toggledIndex].src} />
                    }
                </Modal>
                <img className={item.imageStyle} src={item.src} alt="file" />
                  <div className = "descContainer">
                      <div className = "contentDesc">
                        <div className = "nameFont"> {item.name} </div>
                        <div className = "imageAndDuration"> <img className = "imageStyle" src = {item.image} /> <span className = "timeDuration"> {item.duration} </span>  </div>
                        <div className = "resolutionTag"> {item.dimensions} </div>
                        <div className = "creationStyle"><span className = "createdFont">Created</span>
                            <br />
                            <span className = "timeFont">{getDate()}</span>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
  }
}

export default ContentImages;

