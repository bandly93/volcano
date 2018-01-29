import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateData } from '../redux/modules/vimeoModule.js';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	constants = () => {
		const { fetchData,updateData,postData } = this.props;
		const { name,url,slideId,slides,videoId } = this.props.vimeo;
		return{
			fetchData,postData,updateData,
			name,url,slideId,slides,videoId
		}
	}
		
	componentDidMount(){
		const { fetchData,updateData } = this.constants();
		fetchData('/vimeo',updateData);	
	}

	submitData = (e) => {
		e.preventDefault();
		const { postData,updateData,name,url,slideId,videoId } = this.constants();
		
		let re = 'https://vimeo.com/'
		let imgID = url.replace(re,'');
		let src = "https://vimeo.com/api/v2/video/" + imgID + ".json";

		fetch(src,{credentials:'same-origin'})
			.then(response => response.json())
			.then(data => {
				postData('/vimeo','POST',{name,url,slideId,videoId,thumbnail:data[0].thumbnail_large},updateData);
				updateData({name:'',url:''});	
			}).catch(error => {
				console.log(error);
			})
	}
	
	updateForm = (e) => {
		const { updateData,name,url,slideId } = this.constants();
		const { value } = e.currentTarget;
		updateData({[e.currentTarget.name]:value,slideId});
	}
	
	form = () => {
		const { name,url,slideId } = this.constants();
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
		const { value,type } = e.currentTarget;
		const { updateData } = this.constants();
		type === "slideId"?updateData({[type]:value,videoId:1}):updateData({[type]:value})	
		updateData({name:'',url:''});
	}

	numList = (name,num) => {
		let arr = [...Array(num).keys()];
		return(
			<div className = 'video-player-list'>
				{	
					arr.map(i => 
						<li 
							key = {i+1}
							value = {i+1}
							type = {name}
							onClick = {(e)=>this.currentVideoSlide(e)}> 
							{i+1} 
						</li>
					)
				}
				<img className = "add-button" src = "../images/icons/add.svg" />
			</div>
		)
	}

	render(){
		const { slideId,slides,videoId } = this.constants();
		return(
			<div>
				<h1 className = 'video-player-title'> Video Player </h1>
				<div>
					<ul>
						{this.numList("slideId",slides.length)}
					</ul>
				</div>
				<div className = 'video-player-container'>
					<img className = "video-exit-icon" src = "../images/icons/exit.svg" />
					<div>
						<h3> Updating Slide {slideId}, Video {videoId} </h3>
					</div>
					<div>
						<h3> 
							{
								slides[slideId-1]?
									<div>
										<span>{slides[slideId-1].items[videoId-1].name} : </span>
										<span>{slides[slideId-1].items[videoId-1].url}</span>
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
							{
								slides[slideId-1]?
								this.numList("videoId",slides[slideId-1].items.length)
								:null
							}
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
