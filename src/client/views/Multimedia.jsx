import React,{Component} from 'react';
import { uploadAct } from "../redux/modules/uploadModule";
import { modalAct } from '../redux/modules/multimediaModule';
import { updateData } from '../redux/modules/vimeoModule'; 
import { postData,fetchData } from "../redux/modules/fetchThunk";
import { connect } from "react-redux";
import { modal,toggleModal } from '../utils/SlideShowUtils.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Multimedia extends Component{
	constants = () => {
		const { fetchData,uploadAct,updateData,modalAct,postData } = this.props;
		const { slides } = this.props.vimeo;
		const { firstImages,folders,images,folderName } = this.props.upload;
		const { modalProps,modalType } = this.props.multimedia;
		return {
			fetchData,uploadAct,updateData,modalAct,postData,
			slides,firstImages,folders,images,folderName,modalProps,modalType
		}
	}

	componentDidMount(){
		const { fetchData,uploadAct,updateData,postData } = this.constants();
		fetchData("/upload",uploadAct);
		fetchData("/vimeo",updateData);
	}
	
	//FIX RACE CONDITION && !!!
	setModalProps = (e) => {
		const { name,alt } = e.currentTarget;
		const { postData,uploadAct,modalAct,slides,images } = this.constants();
		
		alt === 'video'?
			modalAct({modalProps:slides[name-1].items,modalType:'video'})
		:
			postData('/upload','PUT',{folderName:name},modalAct)

		toggleModal(this)	
	}	

	photoDisplay = () => {
		const { firstImages,folders } = this.constants();
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
		const { slides } = this.constants();
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
		const { images,folders,firstImages,modalProps,slides,modalType } = this.constants();
		return(
			<div>
				{modalProps?modal(modalProps,modalType):modal()}
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
		uploadAct:(data) => dispatch(uploadAct(data)),
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

