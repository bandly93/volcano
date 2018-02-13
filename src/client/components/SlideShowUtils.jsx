import React from 'react';
import SlideShow from '../components/SlideShow.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';

export const numList = (array) => {
	return <ul>
		{
			 array.map(({},i) => {
				<li
					key = {i}
					value = {i}
					onClick = {(e) => this.sendIndex(e)}> 
				</li>
			})
		}
	</ul>
}

export const keyListener = (e,_this) => {
	const { keyCode } = e;
	switch ( keyCode ) {
		case 39:
			minusOne(_this);
			break;
		case 37:
			addOne(_this);
			break;
		case 27:
			toggleModal(_this)
			break;
		default:
			break;
	}
}

export const toggleModal = (_this) => {
	const { modalAct,uploadAct } = _this.props;
	console.log(_this.props);
	let modal = document.getElementsByClassName('modal')[0];	
	if (modal.style.display === 'block'){
		modal.style.display = 'none';
		uploadAct({images:null});
		modalAct({modalProps:null,modalType:null});
	}else{
		modal.style.display = 'block'
	}
}

export const modal = (props,modalType) => {
	return (
		<div className = 'modal'>
			<div className = 'modal-content'>
				{
					modalType === 'video'?
						<VideoPlayer videos = {props} />
					:
						<SlideShow images = {props} />
				}
			</div>
		</div>
	)
}

export const addOne = (_this) => {
	const { updateIndex } = _this.props;
	const { index } = _this.props.slide
	let length = _this.props.images.length;
	updateIndex({index: ( index+1) % length});
}

export const minusOne = (_this) =>{
	const { index } = _this.props.slide
	let length = _this.props.images.length;
	let { updateIndex } = _this.props;
	index <= 0 ?
		updateIndex({index: length - 1})
	:
		updateIndex({index: index - 1})
}


export const SlideShowUtils = {
	
	modal,addOne,minusOne,keyListener,toggleModal
	
}

export default SlideShowUtils;
