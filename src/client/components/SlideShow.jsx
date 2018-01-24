import React, {Component} from 'react';

class SlideShow extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : 0
		}
	}
	
	//resets index everytime a new image set is passed through.
	componentWillReceiveProps(nextProps){
		if(this.props.images === nextProps.images){return}
		this.setState({index:0});
	}

	addOne = () => {
		const { index } = this.state;
		let length = this.props.images.length;
		this.setState({index: (index+1) % length});	
	}

	minusOne = () => {
		const { index } = this.state;
		let length = this.props.images.length;
		if(index <= 0){
			this.setState({index : length - 1});
		}else{
			this.setState({index : index - 1});
		}
	}
		
	slideShow = (images) => {
		const { toggleModal } = this.props;
		return (
			<div className = 'slideshow-container'>
				<div>
					<button className = "left-button" onClick = {this.minusOne}> &#10094; </button>
				</div>
				<div className = "slideshow-images">
					<img src = {`${images[this.state.index].path}`}/>
				</div>
				<div>
					<button className = "right-button" onClick = {this.addOne}> &#10095; </button>
					<img src = "../images/icons/exit.svg" id = "exit-icon-2" onClick = {toggleModal}/>
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

export default SlideShow;
