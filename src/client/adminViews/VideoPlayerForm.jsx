import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateData } from '../redux/modules/vimeoModule.js';
import VideoPlayer from '../components/VideoPlayer.jsx';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	constants = () => {
		const { fetchData,updateData,postData } = this.props;
		const { name,url,id,urlObj } = this.props.vimeo
		return{
			fetchData,postData,updateData,
			name,url,id,urlObj
		}
	}
		
	componentDidMount(){
		const { fetchData,updateData } = this.constants();
		fetchData('/vimeo',updateData);	
	}

	submitData = (e) => {
		e.preventDefault();
		const { postData,updateData,name,url,id } = this.constants();
		postData('/vimeo','POST',{name,url,id},updateData);
		updateData({name:'',url:''});	
	}
	
	updateForm = (e) => {
		const { updateData,name,url,id } = this.constants();
		const { value } = e.currentTarget;
		updateData({[e.currentTarget.name]:value,id});
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
	
	resetForm = () => {
		const { updateData } = this.constants();
		updateData();

	}
	
	currentVideoSlide = (e) => {
		const { value } = e.currentTarget;
		const { updateData } = this.constants();
		updateData({id:value});
		updateData({name:'',url:''});
	}

	numList = () => {
		let arr = [...Array(4).keys()];
		return(
			<div className = 'video-player-list'>
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
		const { id,urlObj } = this.constants();
		return(
			<div>
				<h1 className = 'video-player-title'> Video Player </h1>
				<div className = 'video-player-container'>
					<div>
						<h3> Updating Video Slide {id} </h3>
					</div>
					<div>
						<h3> 
							{
								urlObj[id-1]?
									<div>
										<span>{urlObj[id-1].name} : </span>
										<span>{urlObj[id-1].url}</span>
									</div>
								:null
							} 
						</h3>
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
			</div>
		)
	}
}

//when component is rendered. the component has data from the store. 
//you tell the function what kind of data you want to pull from the store.
//use mapStateToProps to get access to data. 
const mapStateToProps = (state) => {
	return {
		vimeo:state.vimeo	
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
