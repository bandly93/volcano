import React,{Component} from "react";
import {postData} from '../redux/modules/fetchThunk';
import {uploadAct} from '../redux/modules/uploadModule';
import {connect} from 'react-redux';

class UploadTest extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			file:{}
		}
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFormChange = this.onFormChange.bind(this);
	}
	
	onFormSubmit(e){
		e.preventDefault();
		console.log(this.state.file);
		this.props.postData('/upload','POST',{image:this.state.file},this.props.uploadAct);
	}

	onFormChange(e){
		//photos variable contains all the raw photo data from input
		let photos = e.target.files;	
		const addPhotosToState = (photos) => {
			let d = new Date();
			let photosObj = {};	
			for (let i = 0; i < photos.length; i++){
				let reader = new FileReader();
				reader.onload = function(event){
					photosObj[d.getTime()+i] = {name:photos[i].name,data:event.target.result}
					this.setState({file:{...this.state.file,...photosObj}})
				}.bind(this);
				reader.readAsDataURL(photos[i]);
			}
		}
		addPhotosToState(photos);	
	}
	render(){
		return(
			<div>
				<form onSubmit = {this.onFormSubmit}>
					<input type = "file" name = "image" multiple = "multiple" onChange = {this.onFormChange}/>
					<input type = "submit"/>
				</form>
			</div>
		)
	}
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
