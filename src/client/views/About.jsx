import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';


const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					
class About extends Component{
	componentDidMount(){
		this.props.fetchData('/flickr',this.props.flickrAct)
	}
	render(){
		let list;
		if(this.props.flickr.images){
			list = this.props.flickr.images;
			return(
				<div className = "about-container">
					<div className = "top-row">
						<span>
							<img key = {this.props.flickr.images[5].name} src = {this.props.flickr.images[5].url}/>
							<p>{lorem_ipsum}</p>
						</span>
						<span>
							<img key = {this.props.flickr.images[1].name} src = {this.props.flickr.images[1].url}/>
							<p>{lorem_ipsum}</p>
						</span>
					</div>
				</div>
			)
		}else{
			return (
				<div>
					{this.props.flickr.images? list: null}
				</div>
			)	
		}
	}
}

const mapStateToProps = (state) =>{
	return{
		flickr:state.flickr
	}
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		flickrAct:(flickr)=>dispatch(flickrAct(flickr))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(About);


