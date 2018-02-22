import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateIndex,grabIndex } from '../redux/modules/slideModule.js';
import { uploadAct } from '../redux/modules/uploadModule.js';
import { modalAct } from '../redux/modules/multimediaModule.js';
import { 
	keyListener,toggleModal,addOne,minusOne,setFocus,
	rightButton,leftButton,focusButton,interactiveList	
} from '../utils/SlideShowUtils.jsx';

class VideoPlayer extends Component{
	getVideoId = (url) => {
		let videoId = url.replace('https://vimeo.com/','');
		let src = 'https://player.vimeo.com/video/' + videoId;
		return src;
	}

	iFrame = (modalProps) => {
		const { screenWidth } = this.props.view;
		const { index } = this.props.slide;
		return <iframe 
			src= {modalProps?this.getVideoId(modalProps[index].url):null}
			width= {(screenWidth*0.75)}
			height= {(((screenWidth/16)*9)*0.75)} 
			frameBorder="0"
			allowFullScreen = "true">
		</iframe>
	}
	
	videoSlide = (modalProps) => {
		return <div className = 'slideshow-container'
			onClick = {() => setFocus(this)}
			onKeyDown = {(e)=>keyListener(e,this)}>
			{modalProps.length > 1?leftButton(this):null}
			{this.iFrame(modalProps)}
			{modalProps.length > 1?rightButton(this):null}
			{focusButton(this)}
			{interactiveList(this)}
		</div>
	} 	
	
	render(){
		const { modalProps } = this.props;
		return <div>
			{modalProps?this.videoSlide(modalProps):null}
		</div>
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
	const { slide,view } = state;
	return{
		slide,view
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);



