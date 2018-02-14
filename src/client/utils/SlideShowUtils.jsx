import React from 'react';
import SlideShow from '../components/SlideShow.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';

export const interactiveList = (_this) => {
	const { updateIndex,modalProps } = _this.props;
	const { index } = _this.props.slide;
	let style = {
		on:{
			'backgroundColor':'black',
			'border':'2px solid white'
		},
		off:{
			'backgroundColor':'white',
			'border':'2px solid black'
		}

	}
	return <ul id = 'interactive-list'>
		{
			 modalProps.map(({},i) => 
				<li
					className = 'item-dot-number'
					key = {i}
					value = {i}
					style = {index === i?style.on:style.off}
					onClick = {(e) => updateIndex({index:e.currentTarget.value})}> 
				</li>
			)
		}
	</ul>
}

export const leftButton = (_this) => {
	return <button 
		className = 'left-button'
		onClick = {()=> minusOne(_this)}>
		&#10094;
	</button>
} 

export const rightButton = (_this) => {
	return <button
		className = 'right-button'
		onClick = {() => addOne(_this)}>
		&#10095;
	</button>
}

export const focusButton = (_this) => {
	return <button
		autoFocus
		className = 'focus'>
		<img 
			src = '../images/icons/exit.svg'
			id = 'exit-icon-2'
			onClick = {() => toggleModal(_this)}/>
	</button>
}

export const keyListener = (e,_this) => {
	const { keyCode } = e;
	switch ( keyCode ) {
		case 39:
			addOne(_this);
			break;
		case 37:
			minusOne(_this);
			break;
		case 27:
			toggleModal(_this);
			break;
		default:
			break;
	}
}

export const toggleModal = (_this) => {
	const { modalAct,uploadAct } = _this.props;
	let modalDiv = document.getElementsByClassName('modal')[0];
	if(modalDiv.style.display === 'block'){
		modalDiv.style.display = 'none';
		uploadAct({images:null});
		modalAct({modalProps:null,modalType:null})
	}else{
		modalDiv.style.display = 'block';
	}
}

export const modal = (modalProps,modalType) => {
	return (
		<div className = 'modal'>
			<div className = 'modal-content'>
				{	
					modalType === 'video'?
						<VideoPlayer modalProps = {modalProps} />
					:
						<SlideShow modalProps = {modalProps} />
				}
			</div>
		</div>
	)
}

export const addOne = (_this) => {
	const { updateIndex } = _this.props;
	const { index } = _this.props.slide;
	let length = _this.props.modalProps.length;
	updateIndex({index: ( index+1) % length});
}

export const minusOne = (_this) =>{
	const { index } = _this.props.slide;
	let length = _this.props.modalProps.length;
	let { updateIndex } = _this.props;
	index <= 0 ?
		updateIndex({index: length - 1})
	:
		updateIndex({index: index - 1})
}


export const SlideShowUtils = {	
	modal,addOne,minusOne,keyListener,toggleModal,leftButton,rightButton,
	focusButton,interactiveList
}

export default SlideShowUtils;
