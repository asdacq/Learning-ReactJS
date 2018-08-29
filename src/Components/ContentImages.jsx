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

function getFileType(urlString, item){
    var nameArray = [];
//    urlString = urlString.substr(23);
//    urlString = urlString.slice(0, urlString.indexOf('/'));
    //console.log(urlString);
//    while(isNaN(urlString)){
//        nameArray.push(urlString.substr(0,urlString.indexOf('-')) + " ");
//        urlString = urlString.substr(urlString.indexOf('-')+1);
//    }
    if(urlString.includes("videos")){
//        var lastWord = nameArray[nameArray.length-1];
//        var lengthOfLastWord = nameArray[nameArray.length-1].length - 1;
//        lastWord = lastWord.slice(0, lengthOfLastWord);
//        nameArray.pop();
//        nameArray.push(lastWord + ".jpg")
        nameArray.push(item.picture_id+ ".mp4");
    }
    else{
        //console.log(urlString.hits.id);
        nameArray.push(item.id+ ".jpg");
    }
    return nameArray;
}

//function getVideoType(urlAPI){
//    var nameArray = [];
//    nameArray.push(urlAPI.picture_id+ ".mp4");
//    return nameArray;    
//}

function getDuration(urlAPI){
    return urlAPI.duration;
}

function checkType(urlString){
    if(urlString.includes("videos")){
        return videoIcon;
    }
    else{
        return imageIcon;
    }
}

function getResolution(urlAPI){
    var resolutionHeight, resolutionWidth, dimensions;
    if(urlAPI.type == "photo"){
        resolutionHeight = urlAPI.imageHeight;
        resolutionWidth = urlAPI.imageWidth;
        dimensions = resolutionHeight + " x " + resolutionWidth;
        return dimensions;
    }
    if(urlAPI.type == "film"){
        resolutionHeight = urlAPI.videos.medium.height;
        resolutionWidth = urlAPI.videos.medium.width;
        dimensions = resolutionHeight + " x " + resolutionWidth;
        return dimensions;
    }
}

function getDate(){
    const currDate = new Date();
    return currDate.getFullYear() + "/" + (currDate.getMonth()+1) + "/" + currDate.getDay() + " " + currDate.getHours() + ":" + currDate.getMinutes();
}

function queries(index, key, query){
//    if(index === 0){
//        return "https://pixabay.com/api/?key=" + key + "&q=" + query + "&image_type=all&per_page=10";
//    }
//    if(index === 1){
//        return "https://pixabay.com/api/videos/?key=" + key + "&q=" + query + "&video_type=all&per_page=10";
//    }
//    if(index === 2){
//        return "both";
//    }

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
        }
        let itemURl = '';
    }

    fetchAPI = ( index, name) => {
    const keyJSON = JSON.stringify({key});
    let keyString = keyJSON.substr(8,33);
    //var urlString = "https://pixabay.com/api/videos/?key=" + keyString + "&q=" + name + "&video_type=film&per_page=10";
    var urlString = queries(index, keyString, name)
    fetch(urlString)
    .then( results => {
        return results.json();
    }).then(data => {
        let contents = data.hits.map((item) => {
            var isHorizontal, src, style;
            if(!urlString.includes("video")){
                isHorizontal = item.webformatWidth > item.webformatHeight;
                if(isHorizontal){
                    style = "itemStyleHorizontal";
                }
                else{
                    style = "itemStyleVertical";
                }
                src = item.webformatURL;
            }
            else{
                isHorizontal = item.videos.small.width > item.videos.small.height;
                if(isHorizontal){ 
                    style = "itemStyleHorizontal";
                }
                else{
                    style = "itemStyleVertical";
                }                
                src=`https://i.vimeocdn.com/video/${item.picture_id}_1920x1080.jpg`;
            }
            return(
                <div key = {item.id}>
                <div className = "boxAround">
                    <img className={style} src={src} alt="file" />
                        <div className = "contentDesc">
                            <div className = "nameFont"> {getFileType(urlString, item)} </div>
                            <div className = "test"> <img className = "imageStyle" src = {checkType(urlString)} /> <span className = "timeDuration"> {getDuration(item)} </span>  </div>
                            <div className = "resolutionTag"> {getResolution(item)} </div>
                            <div className = "creationStyle"><span className = "createdFont">Created</span>
                                <br />
                                <span className = "timeFont">{ getDate() }</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        {contents.sort()};
        this.setState({files : contents});
    })    
    }
componentDidMount(){
    this.fetchAPI(this.props.currIndex, this.props.folderArray.foldername);
}
    
componentDidUpdate(previousProps){
    if(this.props.folderArray.foldername !== previousProps.folderArray.foldername){
        this.fetchAPI(this.props.currIndex, this.props.folderArray.foldername);
    }
}
    
  render() {  
    return (
        <div className = "contentFiles">
            {this.state.files}
        </div>
    );
  }
}

export default ContentImages;
