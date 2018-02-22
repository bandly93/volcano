import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateIndex,grabIndex } from '../redux/modules/slideModule.js';
import { uploadAct } from '../redux/modules/uploadModule.js';
import { modalAct } from '../redux/modules/multimediaModule.js';
import { 
	keyListener,toggleModal,addOne,minusOne,leftButton,
	rightButton,focusButton,interactiveList,setFocus
} from '../utils/SlideShowUtils.jsx';

class SlideShow extends Component{

	imageSlide = (modalProps) => {
		const { uploadAct,modalAct } = this.props;
		const { index } = this.props.slide;
		return <div className = 'slideshow-container'
			onClick = {() => setFocus(this)}
			onKeyDown = {(e) => keyListener(e,this)}>
			{modalProps.length > 1?leftButton(this):null}
			<div className = "slideshow-images">
				<img src = {`${modalProps[index].path}`}/>
			</div>
			{modalProps.length > 1?rightButton(this):null}
			{focusButton(this)}
			{interactiveList(this)}
		</div>
	}

	render(){
		const { modalProps } = this.props
		return <div>
			{modalProps?this.imageSlide(modalProps):null}
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
	return {
		slide:state.slide
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideShow);
