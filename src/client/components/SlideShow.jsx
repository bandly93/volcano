import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateIndex,grabIndex } from '../redux/modules/slideModule.js';
import { uploadAct } from '../redux/modules/uploadModule.js';
import { modalAct } from '../redux/modules/multimediaModule.js';
import { 
	keyListener,
	toggleModal,
	addOne,
	minusOne,
	leftButton,
	rightButton,focusButton
} from '../utils/SlideShowUtils.jsx';

class SlideShow extends Component{

	//resets index everytime a new image set is passed through.
	componentWillReceiveProps(nextProps){
		if(this.props.images === nextProps.images){return}
		this.props.updateIndex({index:0});
	}

	imageSlide = (modalProps) => {
		const { uploadAct,modalAct } = this.props;
		return (
			<div 
				className = 'slideshow-container' 
				onKeyDown = {(e) => keyListener(e,this)}>
				<div>
					{modalProps.length > 1?leftButton():null}
				</div>
				<div className = "slideshow-images">
					<img src = {`${modalProps[this.props.slide.index].path}`}/>
				</div>
				<div>
					{modalProps.length > 1?rightButton():null}
					{focusButton()}
				</div>
			</div>
		)
	}

	render(){
		const { images } = this.props
		return (
			<div>
				{images?this.imageSlide(images):null}
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
	return {
		slide:state.slide
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideShow);
