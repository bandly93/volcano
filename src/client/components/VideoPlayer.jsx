import React, { Component } from 'react';
import {connect} from 'react-redux';

class VideoPlayer extends Component{
	//later for slideshow	
	componentWillReceiveProps(newProps){
		this.getVideoId(newProps.url);	
	}
		
	getVideoId = (url) => {
		let videoId = url.replace('https://vimeo.com/','');
		let src = 'https://player.vimeo.com/video/' + videoId;
		return src;
	}
	
	render(){
		const {url,toggleModal} = this.props;
		const {screenWidth} = this.props.view;
		return(
			<div>
				<iframe 
					src= {url?this.getVideoId(url):null}
					width= {(screenWidth*0.75)}
					height= {(((screenWidth/16)*9)*0.75)} 
					frameBorder="0"
					allowFullScreen = "true">
				</iframe>
				<img src = "../images/icons/exit.svg" id = "exit-icon-2" onClick = {toggleModal}/>
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



