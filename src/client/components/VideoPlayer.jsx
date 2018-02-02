import React, { Component } from 'react';
import {connect} from 'react-redux';

class VideoPlayer extends Component{
	//later for slideshow
	constructor(props){
		super(props);
		this.state = {
			index:0
		}
	}
	
	componentWillReceiveProps(newProps){
		if(this.props.videos === newProps.videos){return}
		this.setState({index:0});
	}

	addOne = () => {
		const { index } = this.state;
		let length = this.props.videos.length;
		this.setState({index: (index+1) % length});	
	}

	minusOne = () => {
		const { index } = this.state;
		let length = this.props.videos.length;
		if(index <= 0){
			this.setState({index : length - 1});
		}else{
			this.setState({index : index - 1});
		}
	}
		
	getVideoId = (url) => {
		let videoId = url.replace('https://vimeo.com/','');
		let src = 'https://player.vimeo.com/video/' + videoId;
		return src;
	}
	
	render(){
		const { videos,toggleModal } = this.props;
		const {screenWidth} = this.props.view;
		return(
			<div className = 'slideshow-container'>
				<div>
					<button className = "left-button" onClick = {this.minusOne}> &#10094; </button>
				</div>
				<iframe 
					src= {videos?this.getVideoId(videos[this.state.index].url):null}
					width= {(screenWidth*0.75)}
					height= {(((screenWidth/16)*9)*0.75)} 
					frameBorder="0"
					allowFullScreen = "true">
				</iframe>
				<div>
					<button className = "right-button" onClick = {this.addOne}> &#10095; </button>
					<img src = "../images/icons/exit.svg" id = "exit-icon-2" onClick = {toggleModal}/>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return{
		view:state.view	
	}
}

export default connect(mapStateToProps)(VideoPlayer);



