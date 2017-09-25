import React, {Component} from 'react';


let images = [
	"https://farm5.staticflickr.com/4355/36883361836_82d0cb2496.jpg",
	"https://via.placeholder.com/500x350"
]

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
		console.log(this.state.imgArr);
	}
	minusOne(){
		this.setState(()=>{
			return {
				imgArr: this.state.imgArr - 1
			}
		})
		console.log(this.state.imgArr);
	}

	render(){
		return(
			<div className = 'slideshow-container'>
				<div>
					<button className = "left-button" onClick = {() => this.minusOne()} > &#10094; </button>
					<img src = 'https://farm5.staticflickr.com/4355/36883361836_82d0cb2496.jpg'/>
					<button className = "right-button" onClick = {() => this.addOne()} > &#10095; </button>
				</div>
			</div>
		)
	}
}

export default SlideShow;