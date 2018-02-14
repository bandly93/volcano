import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateIndex,grabIndex } from '../redux/modules/slideModule.js';
import { uploadAct } from '../redux/modules/uploadModule.js';
import { modalAct } from '../redux/modules/multimediaModule.js';
import { 
	keyListener,toggleModal,addOne,minusOne,
	rightButton,leftButton,focusButton	
} from '../utils/SlideShowUtils.jsx';


class VideoPlayer extends Component{
	componentWillReceiveProps(nextProps){
		if(this.props.videos === nextProps.videos){return}
		this.props.updateIndex({index:0})
	}

	getVideoId = (url) => {
		let videoId = url.replace('https://vimeo.com/','');
		let src = 'https://player.vimeo.com/video/' + videoId;
		return src;
	}

	iFrame = (modalProps) => {
		const { screenWidth } = this.props.view;
		return 	<iframe 
			src= {modalProps?this.getVideoId(modalProps[this.props.slide.index].url):null}
			width= {(screenWidth*0.75)}
			height= {(((screenWidth/16)*9)*0.75)} 
			frameBorder="0"
			allowFullScreen = "true">
		</iframe>
	}
	
	videoSlide = (modalProps) => {
		return(
			<div className = 'slideshow-container' onKeyDown = {(e)=>keyListener(e,this)} >
				<div>
					{modalProps.length > 1?leftButton():null}
				</div>
				{this.iFrame(modalProps)}
				<div>
					{modalProps.length > 1?rightButton():null}
					{focusButton()}	
				</div>
			</div>
		)
	} 	
	
	render(){
		const { videos } = this.props;
		return (
			<div>
				{videos?this.videoSlide(videos):null}
			</div>
		)
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		updateIndex:(data) => dispatch(updateIndex(data)),
		grabIndex:(data) => dispatch(grabIndex(data)),
		uploadAct:(data) => dispatch(uploadAct(data)),
		modalAct:(data) => dispatch(modalAct(data))
	}
} 

const mapStateToProps = (state) => {
	return{
		slide:state.slide,
		view:state.view,
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);



