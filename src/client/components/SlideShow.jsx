import React, {Component} from 'react';

class SlideShow extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : 0
		}
	}

	addOne = () => {
		const {index} = this.state;
		let length = this.props.images.length;
		this.setState({index: (index+1) % length})	
	}

	minusOne = () => {
		const {index} = this.state;
		let length = this.props.images.length;

		if(index <= 0){
			this.setState({index : length - 1})
		}else{
			this.setState({index : index - 1})
		}
	}
	
	slideShow = () => {
		const {images} = this.props;
		return (
			<div className = 'slideshow-container'>
				<button className = "left-button" onClick = {this.minusOne}> &#10094; </button>
				<img src = {`${images[this.state.index].url}`}/>
				<button className = "right-button" onClick = {this.addOne}> &#10095; </button>
			</div>
		)
	}

	render(){
		const {images} = this.props;
		return (
			<div>
				{images?this.slideShow():null}
			</div>
		)	
	}
}

export default SlideShow;
