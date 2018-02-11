import React,{Component} from 'react';
import SlideShow from '../components/SlideShow.jsx';
import { uploadAct } from "../redux/modules/uploadModule";
import { modalAct } from '../redux/modules/multimediaModule';
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

	componentDidMount(){
		const { fetchData,uploadAct,updateData } = this.props;	
		fetchData("/upload",uploadAct);
		fetchData("/vimeo",updateData);
	}

	modal = (props) => {
		const { modalType } = this.props.multimedia;
		
		if(modalType === 'video'){
			return(
				<div className = "modal">
					<div className = "modal-content">
						<VideoPlayer videos = {props} toggleModal = {this.toggleModal}/>
					</div>
				</div>
			)
		}else{
			return(
				<div className = "modal">
					<div className = "modal-content">
						<SlideShow images = {props} toggleModal = {this.toggleModal}/>
					</div>
				</div>
			)
		}
	}
	
	toggleModal = () => {
		const { modalAct,uploadAct,updateData } = this.props;
		let modal = document.getElementsByClassName("modal")[0];
		
		if(modal.style.display === "block"){
			modal.style.display = "none";
			uploadAct({images:null});
			modalAct({modalProps:null,modalType:null});
		}else{
			modal.style.display = "block";
		}
	}

	//FIX RACE CONDITION
	setModalProps = (e) => {
		const { name,alt } = e.currentTarget;
		const { postData,uploadAct,modalAct } = this.props;
		const { slides } = this.props.vimeo;
		
		if(alt === 'video'){
			modalAct({modalProps:slides[name-1].items,modalType:"video"});
		}else{	
			postData("/upload","POST",{folderName:name},uploadAct);
			modalAct({modalType:"photo"});
		}
		this.toggleModal();
	}	

	photoDisplay = () => {
		const { firstImages,folders } = this.props.upload;
		return (
			<div>
				{
					firstImages.map((image,i) =>
						<div key = {i} className ="multimedia-box">
							<img 
								className = "multimedia-img" 
								name = {folders[i].name} 
								src = {image}
								onClick = {(e)=>this.setModalProps(e)}
								alt = 'photo'/>
							<p> {folders[i].name} </p>
						</div>
					)
				}
			</div>
		)
	}
	
	videoDisplay = () => {
		const { slides } = this.props.vimeo;
		return (
			<div>
				{
					slides.map((slide,i) => 
						<div key = {i}>
							<img
								className = "multimedia-img"
								name = {slide.slideId}
								src = {slide.items[0].thumbnail}
								onClick = {(e) => this.setModalProps(e)}
								alt = 'video' />	
							<p> {slide.items[0].name} </p>
						</div>
					)	
				}
			</div>
		)		
	}

	render(){
		const { images,folders,firstImages } = this.props.upload;
		const { modalProps } = this.props.multimedia;
		const { slides } = this.props.vimeo;
		//figure out way to check current images with images from props. this should fix the loading previous photo for a second issue./
		return(
			<div>
				{modalProps?this.modal(modalProps):this.modal(images)}
				<div className = "multimedia-flexbox">
					<div className = "multimedia">
						<h1>Photos</h1>
						{firstImages?this.photoDisplay():null}
					</div>
					<div className = "multimedia">
						<h1>Motion</h1>
						{slides.length > 1?this.videoDisplay():null}
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
		updateData:(data) => dispatch(updateData(data)),
		modalAct:(data) => dispatch(modalAct(data))
	}
}

const mapStateToProps = (state) => {
	return{
		upload:state.upload,
		vimeo:state.vimeo,
		multimedia:state.multimedia
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Multimedia);

