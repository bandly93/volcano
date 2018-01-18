import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateData,getData } from '../redux/modules/vimeoModule.js';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	componentDidMount(){
		const { fetchData,getData,updateData } = this.props;
		fetchData('/vimeo',getData);
	}

	submitData = (e) => {
		e.preventDefault();
		const { postData } = this.props;
		const { name,url } = this.props.vimeo.vimeo.formData;
		postData('/vimeo','POST',{name,url},updateData);
	}
	
	updateForm = (e) => {
		const { updateData } = this.props;
		const { value } = e.currentTarget;
		const { name,url } = this.props.vimeo.vimeo.formData;
			
		if (e.currentTarget.name === "name"){
			updateData({name:value,url});
		}else{
			updateData({name,url:value});
		}
	}
	
	form = () => {
		const { name,url } = this.props.vimeo.vimeo.formData;
		return(
			<div>
				<form onSubmit = {this.submitData}>
					<input 
						type = "text"
						placeholder = "name"
						name = "name"
						value = {name}
						onChange = {(e)=>this.updateForm(e)}
					/>	
					<input
						type = "text"
						placeholder = "url"
						name = "url"
						value = {url}
						onChange = {(e)=>this.updateForm(e)}
					/>
					<input type = "submit" />
				</form>
			</div>
		)
	}
	
	render(){
		return(
			<div>
				{this.form()}
			</div>
		)
	}
}

//when component is rendered. the component has data from the store. 
//you tell the function what kind of data you want to pull from the store.
//use mapStateToProps to get access to data. 
const mapStateToProps = (state) => {
	return {
		vimeo:state	
	}
}
//use mapDispatchToProps to make changes to the redux state. Add Files... etc
const mapDispatchToProps = (dispatch) => {
	return {
		fetchData:(url,action) => dispatch(fetchData(url,action)),
		postData:(url,method,data,action) => dispatch(postData(url,method,data,action)),
		updateData:(data) => dispatch(updateData(data)),
		getData:(data) => dispatch(getData(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayerForm);
