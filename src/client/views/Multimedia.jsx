import React,{Component} from 'react';
import SlideShow from '../components/SlideShow.jsx';
import { uploadAct } from "../redux/modules/uploadModule";
import { postData,fetchData } from "../redux/modules/fetchThunk";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Multimedia extends Component{

	componentDidMount(){
		const { fetchData,uploadAct } = this.props;	
		fetchData("/upload",uploadAct);
	}

	moveToTop = () => {
		let scrollSpeed = -window.scrollY/(400/30),
		scrollInterval = setInterval(() => {
			if(window.scrollY != 0){
				window.scrollBy(0,scrollSpeed);
			}else{
				clearInterval(scrollInterval);
			}
		},15);
	}
	
	fetchPhotos = (e) => {
		let folderName = e.currentTarget.name;
		const { postData,uploadAct } = this.props;
		postData("/upload","POST",{folderName},uploadAct);
	}

	onClickFunctions = (e) => {
		this.fetchPhotos(e);	
		this.moveToTop();	
	}

	modal = (images) => {
		return(
			<SlideShow images = {images}/>
		)
	}

	
	/*	
	toggleModal = (e) => {
		
		let modal = document.getElementsByClassName("modal")[0];
		console.log(modal);
	
			
				if(modal.style.display === "block"){
					modal.style.display = "none";
				}else{
					modal.style.display = "block";
				}	
	}
	*/
	

	render(){
		const { images } = this.props.upload;
		return(
			<div>
				{images?this.modal(images):null}
				<div className = "multimedia-flexbox">
					<div className = "multimedia">
						<h1>Photos</h1>
						<img onClick = {(e) => this.onClickFunctions(e)} name = "Portraits" src='https://via.placeholder.com/500x350'/>
						<p>PORTRAITS</p>
						<img onClick = {(e) => this.onClickFunctions(e)} name = "Creative" src='https://via.placeholder.com/500x350'/>
						<p>CREATIVE</p>
						<img onClick = {(e) => this.onClickFunctions(e)} name = "Headshots" src='https://via.placeholder.com/500x350'/>
						<p>HEADSHOTS</p>
						<img onClick = {(e) => this.onClickFunctions(e)} name = "WeddingPhotos" src='https://via.placeholder.com/500x350'/>
						<p>WEDDING PHOTOS</p>
					</div>
					<div className = "multimedia">
						<h1>Motion</h1>
						<img onClick = {this.moveToTop} name = "Lookbooks" src='https://via.placeholder.com/500x350'/>
						<p>LOOKBOOKS</p>
						<img onClick = {this.moveToTop} name = "WeddingVideos" src='https://via.placeholder.com/500x350'/>
						<p>WEDDING VIDEOS</p>
						<img onClick = {this.moveToTop} name = "MusicVideos" src='https://via.placeholder.com/500x350'/>
						<p>MUSIC VIDEOS</p>
						<img onClick = {this.moveToTop} name = "ShortFilms" src='https://via.placeholder.com/500x350'/>
						<p>SHORT FILMS</p>
					</div> 
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postData:(url,method,data,actFunc) => dispatch(postData(url,method,data,actFunc)),
		fetchData:(url,actFunc) => dispatch(fetchData(url,actFunc)),
		uploadAct:(upload) => dispatch(uploadAct(upload))
	}
}

const mapStateToProps = (state) => {
	return{
		upload:state.upload
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Multimedia);

