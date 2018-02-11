import React,{Component} from "react";
import PhotoLibrary from "./PhotoLibrary.jsx";
import {uploadAct} from '../redux/modules/uploadModule';
import {postData,fetchData} from '../redux/modules/fetchThunk';
import ImageCompressor from 'image-compressor.js';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class UploadTest extends Component{
	
	constants = () => {
		const { fetchData,uploadAct,postData } = this.props;
		const { folderName,folders,images } = this.props.upload;
		const { newImages,folder } = this.state;
		return {
			fetchData,uploadAct,postData,folderName,folders,images,newImages,folder
		}
	}
	
	constructor(props){
		super(props);
		this.state = {
			newImages:[],
			folder:''
		}
	}

	//get all folders name on page load.
	componentDidMount(){
		const { fetchData,uploadAct } = this.constants();
		fetchData('/upload',uploadAct);
	}

	//function to add photos to system
	addPhotos=(e)=>{
		e.preventDefault();
		const { postData,uploadAct,folderName,newImages } = this.constants();
		postData('/upload','POST',{newImages,folderName},uploadAct);
	}

	//function to add folder to system
	addFolder=(e)=>{
		e.preventDefault();
		const { postData,uploadAct,folder } = this.constants();
		postData('/upload','POST',{folder},uploadAct);		
	}

	//keep track of temporary photos to send over to system.
	photoFormChange=(e)=>{
		const newImages = constructPhotoArray(e.target.files);
		this.setState({newImages});
	}

	//keep track of folder to send over to system.
	folderFormChange=(e)=>{
		this.setState({folder:e.target.value});
	}

	//function to delete a target photo or folder.	
	deleteItem=(e)=>{
		const { name,value } = e.currentTarget;
		const { postData,uploadAct,folderName } = this.constants();
		postData('/upload','DELETE',{name,value,folderName},uploadAct);
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

	//container that returns a add folder button.
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
	currentBatch=(folderName)=>{
		const { postData,uploadAct} = this.constants();	
		postData('/upload','POST',{folderName},uploadAct);	
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
		const { folderName,folders } = this.constants();
		return(
			folders.map(folder => 
				<div key = {folder.name} className = "upload">
					<li onClick = {()=>this.currentBatch(folder.name)}>
						{folder.name === folderName?this.openFolder():this.closedFolder()}	
						<h2>{folder.name}</h2>
					</li>
					<button className = "upload-button" value = "folder" onClick = {this.deleteItem} name = {folder.name}> &times; </button>
				</div>
			)
		)
	}
	
	toggleModal = (e) => {
		//array of objects
		const { images } = this.constants();	
		for(let i = 0; i < images.length; i++){
			if(images[i].name === e){
				let modal = document.getElementsByClassName("modal")[i];
				if(modal.style.display === "block"){
					modal.style.display = "none";
				}else{
					modal.style.display = "block"
				}
			}
		}
	}
	photoDashboard = () => {
		return (
		<div className = "photo-dashboard">
			<li>Photo</li>
			<li>Name</li>
			<li>Resolution</li>
			<li>Date Added</li>
			<li>Delete</li>
		</div>
		)	
	}

	//returns a list of all photos with empty/non-empty logic.
	photoLibrary = () => {
		const { images } = this.constants();
		return(
			images.map(image => 
				<div key = {image.name} className = "upload">
					<div className = "upload-content">
						<li>
							<img src = {image.path} className = "thumbnail" onClick = {() => this.toggleModal(image.name)}/>
						</li>
						<span>
							<div className = "modal" onClick = {()=>this.toggleModal(image.name)}>
								<div className = "modal-content">
									<img src = {image.path} />
								</div>
							</div>
						</span>
						<li>
							<h6 id = "image-name">{image.name}</h6>
						</li>
						<li>
							<h6> 1024x800 </h6>
						</li>
						<li>
							<h6> 1/7/2018 1:30AM </h6>
						</li>
						
						<li>
							<button 
								className = "upload-button" 
								value = "photo" 
								onClick = {this.deleteItem} 
								name = {image.name}> 
									<img src = "../images/icons/exit.svg" className = "exit-icon"/>
							</button>
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
		return(
			<div>
				<h1> There are no folders. </h1>
			</div>
		)
	}

	//returns the file-storage-system viewer.
	render(){
		const { images,folders } = this.constants();
		return(
			<div className = "file-storage-system">
				<div className = "panel-left">
					<h3> Folders </h3>
					<div> {folders?this.folderLibrary():this.noFolder()} </div>
					<div> {this.addFolderButton()} </div>
				</div>
				<div className = "panel-right">
					<h3> Photos </h3>
					<div> {this.photoDashboard()}</div>
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
		let transformedPhoto = new ImageCompressor(photos[i],{
			quality:.6,
			maxWidth:3200,
			maxHeight:1900,
			minWidth:1600,
			minHeight:900,
			success(result){
				reader.onload = function(event){
					photoArray.push({id:d.getTime()+i,name:photos[i].name,data:event.target.result});
				}
				reader.readAsDataURL(result);
			},
			error(e){
				console.log(e.message);
			}
		})
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
