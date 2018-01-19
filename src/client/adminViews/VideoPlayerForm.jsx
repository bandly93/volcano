import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateData,updateCurrentVideo } from '../redux/modules/vimeoModule.js';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	constants = () => {
		const { fetchData,updateData,postData,updateCurrentVideo } = this.props;
		const { name,url,id } = this.props.vimeo.vimeo;
		return{
			fetchData,
			postData,
			updateData,
			updateCurrentVideo,
			name,
			url,
			id
		}
	}
		
	componentDidMount(){
		const { fetchData,updateData } = this.constants();
		fetchData('/vimeo',updateData);	
	}

	submitData = (e) => {
		e.preventDefault();

							//old way
		// const { postData,updataData } = this.props;
		// const { name,url,id } = this.props.vimeo.vimeo;
	
							//new way	
		const { postData,updateData,name,url,id} = this.constants();
		postData('/vimeo','POST',{name,url,id},updateData);	
	}
	
	updateForm = (e) => {
		const { updateData,name,url,id } = this.constants();
		const { value } = e.currentTarget;
			
		if (e.currentTarget.name === "name"){
			updateData({name:value,url,id});
		}else{
			updateData({name,url:value,id});
		}
	}

	form = () => {
		const { name,url,id } = this.constants();
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
		const { value } = e.currentTarget;
		const { updateCurrentVideo } = this.constants();
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
							onClick = {(e)=>this.currentVideoSlide()}> 
							{i+1} 
						</li>
					)
				}
			</div>
		)
	}	
	
	render(){
		return(
			<div>
				<div>
					<h1> Video Player </h1>
				</div>
				<div>
					{this.form()}
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
