import React, {Component} from "react";
import DropZone from "react-dropzone";

class Upload extends Component{
	constructor(props){
		super(props);	
		this.state={
			filesPreview:[],
			filesToBeSent:[],
			printCount:10,
		}
	}
	onDrop(acceptedFiles,rejectedFiles){
		var filesToBeSent = acceptedFiles;
		if(filesToBeSent.length < this.state.printCount){
			var filesPreview = [];
			filesToBeSent.map(images => filesPreview.push(
				<div>{images.name}</div>
			));	
			this.setState({filesToBeSent,filesPreview});
		}else{
			alert("You have reached the limit of uploading files at a time");
		}
	}
	handleClick(e){
		
		console.log(this.state.filesToBeSent);
	}

	render(){
		return(
			<div className = "file-storage-system">
				<DropZone onDrop = {(files)=> this.onDrop(files)}>
					<h1>Upload a photo to the file storage system.</h1>
				</DropZone>
				<div>
					Files to be uploaded are:
					{this.state.filesPreview}
				</div>
				<button onClick = {(event)=>this.handleClick(event)}>
					Submit Photos
				</button>
			</div>
		)
	}
}

export default Upload;
