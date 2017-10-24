import React,{Component} from "react";
import {postData} from '../redux/modules/fetchThunk';
import {uploadAct} from '../redux/modules/uploadModule';
import {connect} from 'react-redux';

class UploadTest extends Component{
	constructor(props){
		super(props);
		this.state = {
			file:''
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
		var data = e.target.files[0]
		var reader = new FileReader();
		reader.onload = function(event){
			this.setState({file:event.target.result})
		}.bind(this);
		reader.readAsDataURL(data);
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
