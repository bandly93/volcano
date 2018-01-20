import React,{Component} from 'react';
import SlideShow from '../components/SlideShow.jsx';
import { uploadAct } from "../redux/modules/uploadModule";
import { updateData } from '../redux/modules/vimeoModule'; 
import { postData,fetchData } from "../redux/modules/fetchThunk";
import { connect } from "react-redux";
import VideoPlayer from '../components/VideoPlayer.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Multimedia extends Component{
	
	constructor(){
		super();
		this.state = {
			folderName:null
		}
	}

	componentDidMount(){
		const { fetchData,uploadAct,updateData } = this.props;	
		fetchData("/upload",uploadAct);
		fetchData("/vimeo",updateData);
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
	
	fetchPhotos = (folderName) => {
		const { postData,uploadAct } = this.props;
		postData("/upload","POST",{folderName},uploadAct);
	}

	onClickFunctions = (e) => {
		let promise = new Promise((resolve,reject) => {
			resolve(this.setState({folderName:e.currentTarget.name}));
		}).then(() => {
			const { folderName } = this.state;
			this.fetchPhotos(folderName);
		}).then(() => {
			this.toggleModal();
		}).catch(err => {
			console.log(err);
		})
		this.moveToTop();	
	}
	
	modal = (images) => {
		return(
			<div className = "modal">
				<div className = "modal-content">
					<SlideShow images = {images} toggleModal = {this.toggleModal}/>
				</div>
			</div>
		)
	}
	
	toggleModal = () => {
		let modal = document.getElementsByClassName("modal")[0];
		
		if(modal.style.display === "block"){
			modal.style.display = "none";
		}else{
			modal.style.display = "block";
		}
	}	

	photoDisplay = () => {
		const { firstImages,folders } = this.props.upload;
		let arr = [...Array(firstImages.length).keys()];	
		return (
			<div>
				{
					arr.map(i =>
						<div key = {i}>
							<img 
								onClick = {(e) => this.onClickFunctions(e)}
								name = {folders[i].name} 
								src = {firstImages[i]}	
								 />
							<p> {folders[i].name} </p>
						</div>
					)
				}
			</div>
		)
	}
	
	videoDisplay = () => {
		const { urlObj } = this.props.vimeo;
		let arr = [...Array(urlObj.length).keys()];
		
		return (
			<div>
				{
					arr.map(i => 
						<div key = {i}>
							<VideoPlayer url = {urlObj[i].url} />
							<p> {urlObj[i].name} </p>
						</div>
					)	
				}
			</div>
		)		
	}


	render(){
		const { images,folders,firstImages } = this.props.upload;
		const { urlObj } = this.props.vimeo;
		//figure out way to check current images with images from props. this should fix the loading previous photo for a second issue./
		return(
			<div>
				{images?this.modal(images):this.modal()}	
				<div className = "multimedia-flexbox">
					<div className = "multimedia">
						<h1>Photos</h1>
						{firstImages?this.photoDisplay():null}
					</div>
					<div className = "multimedia">
						<h1>Motion</h1>
						{urlObj?this.videoDisplay():null}
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
		uploadAct:(upload) => dispatch(uploadAct(upload)),
		updateData:(data) => dispatch(updateData(data))
	}
}

const mapStateToProps = (state) => {
	return{
		upload:state.upload,
		vimeo:state.vimeo
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Multimedia);

