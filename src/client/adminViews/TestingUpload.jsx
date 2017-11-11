import React,{Component} from "react";
import PhotoLibrary from "./PhotoLibrary.jsx";
import {uploadAct} from '../redux/modules/uploadModule';
import {postData} from '../redux/modules/fetchThunk';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class UploadTest extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			file:[]
		}
	}
	
		//NOTE USE A PROMISE TO DO A .then after doing a delete/submit.
	reload(){	
		this.props.postData('/upload/getFiles','POST',{},this.props.uploadAct);	
	}
	
	componentDidMount(){
		this.reload();	
	}

	submitPhotos=(e)=>{ 
		e.preventDefault();
		this.props.postData('/upload','POST',{data:this.state.image},this.props.uploadAct)
		this.reload();
	}
	
	onFormChange=(e)=>{
		const photos = e.target.files;
		this.setState({image:constructPhotoArray(photos)});
	}

	deletePhoto=(e)=>{
		const photoName = e.currentTarget.name;
		this.props.postData('/upload/delete','POST',{data:photoName},this.props.uploadAct)
		this.reload();
	}

	form=()=>{
		return(
			<div>
				<form onSubmit = {this.submitPhotos}>
					<input type = "file" name = "image" multiple = "multiple" onChange = {this.onFormChange}/>
					<input type = "submit"/>
				</form>
			</div>
		)
	}

	photoLibrary=()=>{
		return this.props.upload.images.map(images => 
			<div key = {images.name} >
				<li>{images.name}</li>
				<img src = {images.path}/>
				<button onClick = {this.deletePhoto} name = {images.name}> x </button>
			</div>
		)
	}

	render(){
		const images = this.props.upload.images
		return(
			<div>
				{this.form()}
				{images?this.photoLibrary():null}
			</div>
		)
	}
}
const constructPhotoArray = (photos) => {
	let photoArray = [];
	for (let i = 0; i < photos.length; i++){
		let reader = new FileReader();
		let d = new Date();
		reader.onload = function(event){
			photoArray.push({id:d.getTime()+i,name:photos[i].name,data:event.target.result});
		}
		reader.readAsDataURL(photos[i]);
	}
	return photoArray;
}

const mapStateToProps = (state) => {
	return {
		upload:state.upload
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		uploadAct:(upload)=>dispatch(uploadAct(upload))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadTest);
