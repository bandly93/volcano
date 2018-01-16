import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData,postData } from '../redux/modules/fetchThunk.js';
import { updateURL,updateName,getAllData } from '../redux/modules/vimeoModule';

//create four forms where you can add a vimeo url for the multimedia page.

			//lookbooks , wedding videos , music videos , short films;
			//use redux

class VideoPlayerForm extends Component{

	componentDidMount(){
		const { fetchData, getAllData } = this.props;
		fetchData('/vimeo',getAllData);
	}
	
	form = () => {
		return(
			<div>
			
			</div>

		)
	}
	
	render(){
		return(
			<div>
				<h1>Viewing from the VideoPlayerForm</h1>
			</div>
		)
	}
}

//when component is rendered. the component has data from the store. 
//you tell the function what kind of data you want to pull from the store.
//use mapStateToProps to get access to data. 
const mapStateToProps = (state) => {
	return {
		url:state.url,
		name:state.name
	}
}
//use mapDispatchToProps to make changes to the redux state. Add Files... etc
const mapDispatchToProps = (dispatch) => {
	return {
		fetchData:(url,action) => dispatch(fetchData(url,action)),
		postData:(url,method,data,action) => dispatch(postData(url,method,data,action)),
		updateURL:(url) => dispatch(updateURL(url)),
		updateName:(name) => dispatch(updateName(name)),
		getAllData:() => dispatch(getAllData())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayerForm);
