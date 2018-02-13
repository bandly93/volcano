import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateIndex,grabIndex } from '../redux/modules/slideModule.js';
import { uploadAct } from '../redux/modules/uploadModule.js';
import { modalAct } from '../redux/modules/multimediaModule.js';


import { keyListener,toggleModal,addOne } from '../components/SlideShowUtils.jsx';

class SlideShow extends Component{


	//resets index everytime a new image set is passed through.
	componentWillReceiveProps(nextProps){
		if(this.props.images === nextProps.images){return}
		this.props.updateIndex({index:0});
	}

	slideShow = (images) => {
		const { uploadAct,modalAct } = this.props;
		return (
			<div 
				className = 'slideshow-container' 
				onKeyDown = {(e) => keyListener(e,this)}>
				<div>
					{
						images.length > 1?
							<button 
								className = "left-button" 
								onClick = {()=>minusOne(this)}> 
								&#10094;
					 		</button>
						:null
					}
				</div>
				<div className = "slideshow-images">
					<img src = {`${images[this.props.slide.index].path}`}/>
				</div>
				<div>
					{	
						images.length > 1?
							<button 
								className = "right-button"
								onClick = {()=>addOne(this)}> 
								&#10095; 
							</button>
						:null
					}
					<button autoFocus className = "focus">	
						<img 
							src = "../images/icons/exit.svg"
							id = "exit-icon-2" 
							onClick = {()=>toggleModal(this)}/>
					</button>
				</div>
			</div>
		)
	}

	render(){
		const { images } = this.props;
		return (
			<div>
				{images?this.slideShow(images):null}
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
