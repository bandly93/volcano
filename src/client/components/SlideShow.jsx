import React, {Component} from 'react';

class SlideShow extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : 0
		}
		this.addOne = this.addOne.bind(this);
		this.minusOne = this.minusOne.bind(this);
	}
	addOne(){
		let index = this.state.index
		let length = this.props.images.length
		this.setState(() => {
      		return {
        		index: (index+ 1) % length
      		}
    	})
	}
	minusOne(){
		let index = this.state.index
		let length = this.props.images.length
		this.setState(() => {
			if (index <= 0){
				return {
					index : length - 1
				}
			}return{
				index : index - 1 
			}
		})
	}
	render(){
		let images = this.props.images;
		if (this.props.images){
			return (
				 <div className = 'slideshow-container'>
					<button className = "left-button" onClick = {() => this.minusOne()}> &#10094; </button>
					<img src = {`${images[this.state.index].url}`}/>
					<button className = "right-button" onClick = {() => this.addOne()}> &#10095; </button>
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
