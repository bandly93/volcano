import React, { Component } from 'react';

class VideoPlayer extends Component{
	//later for slideshow	
	componentWillReceiveProps(newProps){
			
	}
		
	getVideoId = (url) => {
		let videoId = url.replace('https://vimeo.com/','');
		let src = 'https://player.vimeo.com/video/' + videoId;
		return src;
	}
	render(){
		const {url} = this.props;
		return(
			<div>
				<iframe 
					src= {url?this.getVideoId(url):null}
					width="640" 
					height="360"  
					frameBorder="0"
					allowFullScreen = "true"
				 >
				</iframe>
			</div>
		)
	}
}

export default VideoPlayer;



