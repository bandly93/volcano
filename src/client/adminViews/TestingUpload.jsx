import React,{Component} from "react";
import PhotoLibrary from "./PhotoLibrary.jsx";
import {uploadAct} from '../redux/modules/uploadModule';
import {postData,fetchData} from '../redux/modules/fetchThunk';
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
			images:[],
			folder:''
		}
	}
	
	componentDidMount(){
		const { fetchData,uploadAct } = this.props;
		fetchData('/upload',uploadAct);
	}

	//add functions
	addPhotos=(e)=>{ 
		e.preventDefault();
		const { postData , uploadAct} = this.props;
		postData('/upload','POST',{images:this.state.images},uploadAct);
	}

	addFolder=(e)=>{
		e.preventDefault();
		const { postData , uploadAct} = this.props;	
		postData('/upload','POST',{folder:this.state.folder},uploadAct);		
	}
	
	photoFormChange=(e)=>{
		const photos = e.target.files;
		this.setState({images:constructPhotoArray(photos)});
	}
	folderFormChange=(e)=>{
		this.setState({folder:e.target.value});
	}

	//delete function	
	deleteItem=(e)=>{
		const { name,value } = e.currentTarget;
		const { postData,uploadAct } = this.props;
		postData('/upload','DELETE',{data:name,type:value},uploadAct);
	}

	// add functions
	addPhotoButton = () => {
		return(
			<div>
				<form onSubmit = {this.addPhotos}>
					<input 
						type = "file" 
						name = "image" 
						multiple = "multiple"
						onChange = {this.photoFormChange}/>
					<input type = "submit"/>
				</form>
			</div>	
		)
	}

	addFolderButton = () => {
		return(
			<div>
				<form onSubmit = {this.addFolder}>
					<input 
						type = "text" 
						name = "folder"
						onChange = {this.folderFormChange}
					/>
					<input type = "submit"/>
				</form>
			</div>	
		)
	}
	currentBatch=(name)=>{
		console.log(name);
		const { postData , uploadAct} = this.props;	
		postData('/upload','POST',{folderName:name},uploadAct);	
		
	}
		
	folderLibrary = () => {
		return(
			this.props.upload.folders.map(folder => 
				<div key = {folder.name} className = "upload-folder" > 
					<li onClick = {()=>this.currentBatch(folder.name)} >{folder.name}</li>
					<button value = "folder" onClick = {this.deleteItem} name = {folder.name}> x </button>
				</div>
			)
		)
	}
	//<img src = {image.path}/>
	
	photoLibrary = () => {
		return(
			this.props.upload.images.map(image => 
				<div key = {image.name} className = "upload-image">
					<li>{image.name}</li>
					<button value = "photo" onClick = {this.deleteItem} name = {image.name}> x </button>
				</div>
			)
		)
	}

	noPhotos = () => {
		return( 
			<div>
				<h1>No content to display here.</h1>
			</div>
		)
	}

	render(){
		const {images, folders} = this.props.upload; 
		return(
			<div className = "file-storage-system">
				<div className = "panel">
					<h3> Folders </h3>
					<div>
						{folders?this.folderLibrary():this.noPhotos()}
					</div>
					<div>
						{this.addFolderButton()}
					</div>
				</div>
				<div className = "panel">
					<h3> Photos </h3>
					<div>
						{images?this.photoLibrary():this.noPhotos()}
					</div>
					<div>
						{this.addPhotoButton()}
					</div>
				</div>
				
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
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		uploadAct:(upload)=>dispatch(uploadAct(upload))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadTest);
