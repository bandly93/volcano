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

	//get all folders name on page load.
	componentDidMount(){
		const { fetchData,uploadAct } = this.props;
		fetchData('/upload',uploadAct);
	}

	//function to add photos to system
	addPhotos=(e)=>{
		e.preventDefault();
		const { postData,uploadAct } = this.props;
		const { folderName } = this.props.upload;
		console.log(this.state.images);
		postData('/upload','POST',{images:this.state.images,folderName:folderName},uploadAct);
	}

	//function to add folder to system
	addFolder=(e)=>{
		e.preventDefault();
		const { postData,uploadAct } = this.props;	
		postData('/upload','POST',{folder:this.state.folder},uploadAct);		
	}

	//keep track of temporary photos to send over to system.
	photoFormChange=(e)=>{
		const photos = e.target.files;
		this.setState({images:constructPhotoArray(photos)});
	}

	//keep track of folder to send over to system.
	folderFormChange=(e)=>{
		this.setState({folder:e.target.value});
	}

	//function to delete a target photo or folder.	
	deleteItem=(e)=>{
		const { name,value } = e.currentTarget;
		const { postData,uploadAct } = this.props;
		const { folderName } = this.props.upload;
		postData('/upload','DELETE',{data:name,type:value,folderName:folderName},uploadAct);
	}

	//container that returns a add photo button.
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

	//containr that returns a add folder button.
	addFolderButton = () => {
		return(
			<div>
				<form onSubmit = {this.addFolder}>
					<input 
						type = "text" 
						name = "folder"
						placeholder = "add folder"
						onChange = {this.folderFormChange}/>
					<input type = "submit"/>
				</form>
			</div>	
		)
	}
	
	//function that sends current folder clicked to system.
	currentBatch=(name)=>{
		const { postData , uploadAct} = this.props;	
		postData('/upload','POST',{folderName:name},uploadAct);	
	}

	//container that returns a closed folder image.
	closedFolder = () => {
		return (
			<img src = "../images/icons/closed-folder.svg" className = "folder-icon"/>
		)	
	}
	
	//container that returns a open folder image.
	openFolder = () => {
		return (
			<img src = "../images/icons/open-folder.svg" className = "folder-icon"/>
		)	
	}

	//returns a list of all folders with empty/non-empty logic.
	folderLibrary = () => {
		const { folderName,folders } = this.props.upload;
		return(
			folders.map(folder => 
				<div key = {folder.name} className = "upload">
					<li onClick = {()=>this.currentBatch(folder.name)}>
						{folder.name === folderName?this.openFolder():this.closedFolder()}	
						<h2>{folder.name}</h2>
					</li>
					<button className = "upload-button" value = "folder" onClick = {this.deleteItem} name = {folder.name}> x </button>
				</div>
			)
		)
	}

	//returns a list of all photos with empty/non-empty logic.
	photoLibrary = () => {
		const { images } = this.props.upload;
		return(
			images.map(image => 
				<div key = {image.name} className = "upload">
					<div>
						<li>
							<img src = {image.path} className = "thumbnail" />
							<h6>{image.name}</h6>
							<button className = "upload-button" value = "photo" onClick = {this.deleteItem} name = {image.name}> x </button>
						</li>	
					</div>
				</div>
			)
		)
	}

	//returns a no content message.
	noContent = () => {
		return( 
			<div>
				<h1> Select a folder to view content. </h1>
			</div>
		)
	}
	
	//returns a no folder message.
	noFolder = () =>{
		return (
			<div>
				<h1> There are no folders. </h1>
			</div>
		)
	}

	//returns the file-storage-system viewer.
	render(){
		const { images,folders } = this.props.upload;
		return(
			<div className = "file-storage-system">
				<div className = "panel-left">
					<h3> Folders </h3>
					<div> {folders?this.folderLibrary():this.noFolder()} </div>
					<div> {this.addFolderButton()} </div>
				</div>
				<div className = "panel-right">
					<h3> Photos </h3>
					<div> {images?this.photoLibrary():this.noContent()} </div>
					<div> {images?this.addPhotoButton():null} </div>
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
		console.log(d);
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
