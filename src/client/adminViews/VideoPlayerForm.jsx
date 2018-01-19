import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateData,updateCurrentVideo } from '../redux/modules/vimeoModule.js';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	componentDidMount(){
		const { fetchData,updateData } = this.props;
		fetchData('/vimeo',updateData);
	}

	submitData = (e) => {
		e.preventDefault();
		const { postData,updateData } = this.props;
		const { name,url,currentVideo } = this.props.vimeo.vimeo
		postData('/vimeo','POST',{name,url,currentVideo},updateData);
	}
	
	updateForm = (e) => {
		const { updateData } = this.props;
		const { value } = e.currentTarget;
		const { name,url,currentVideo } = this.props.vimeo.vimeo
			
		if (e.currentTarget.name === "name"){
			updateData({name:value,url,id:currentVideo});
		}else{
			updateData({name,url:value,id:currentVideo});
		}
	}
	
	form = () => {
		const { name,url } = this.props.vimeo.vimeo
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
	
	currentVideoSlide = (e) => {
		const {value} = e.currentTarget;
		const { updateCurrentVideo } = this.props;
		updateCurrentVideo(value);
		
	}

	numList = () => {
		let arr = [...Array(4).keys()];
		return(
			<div>
				{	
					arr.map(i => 
						<li 
							key = {i+1}
							value = {i+1}
							onClick = {(e)=>this.currentVideoSlide(e)}> 
							{i+1} 
						</li>
					)
				}
			</div>
		)
	}	
	
	render(){
		const { currentVideo } = this.props.vimeo.vimeo;
		return(
			<div>
				<div>
					<h1> Video Player </h1>
				</div>
				<div>
					{this.form(currentVideo)}
				</div>
				<div>
					<ul>
						{this.numList()}
					</ul>
				</div>
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
		updateCurrentVideo:(data) => dispatch(updateCurrentVideo(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayerForm);
