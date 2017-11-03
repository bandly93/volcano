import React,{Component} from "react";
import PhotoLibrary from "./PhotoLibrary.jsx";
import {postData} from '../redux/modules/fetchThunk';
import {uploadAct} from '../redux/modules/uploadModule';
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
			file:{}
		}
	}
	
	onFormSubmit=(e)=>{
		e.preventDefault();
		console.log(this.state.file);
		this.props.postData('/upload/getFiles','POST',{image:this.state.file},this.props.uploadAct);
	};

	onFormChange=(e)=>{
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
	};
	render(){
		const path = this.props.match.path;
		return(
			<Router>
				<div>	
					<div>
						<form onSubmit = {this.onFormSubmit}>
							<input type = "file" name = "image" multiple = "multiple" onChange = {this.onFormChange}/>
							<input type = "submit"/>
						</form>
						<div>
							<Link to = {`${path}/photolibrary`} >Click here to see all photos </Link>
						</div>
					</div>
					<Switch>
						<Route exact path = {`${path}/photolibrary`} component = {PhotoLibrary}/>
					</Switch>
				</div>
			</Router>
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
