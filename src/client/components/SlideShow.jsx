import React, {Component} from 'react';

class SlideShow extends Component{
	constructor(props){
		super(props);
		this.state = {
			imgArr : 0
		}
		this.addOne = this.addOne.bind(this);
		this.minusOne = this.minusOne.bind(this)
	}

	addOne(){
		this.setState(() => {
      	return {
        		imgArr: this.state.imgArr + 1
      	}
    	})
	}
	minusOne(){
		this.setState(() => {
			return {
				imgArr: this.state.imgArr - 1
			}
		})
	}

	render(){
		let images = this.props.images;
		if (this.props.images){
			return (
				 <div className = 'slideshow-container'>
					<button className = "left-button" onClick = {() => this.minusOne()} > &#10094; </button>
					<img src = {`${images[this.state.imgArr].url}`}/>
					<button className = "right-button" onClick = {() => this.addOne()} > &#10095; </button>
				</div>
			)
		}return(
			<div>
				{this.props.images? images: null}
			</div>	
		)
	}
}

export default SlideShow;