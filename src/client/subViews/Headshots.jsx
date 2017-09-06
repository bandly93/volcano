import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';

class Headshots extends Component{
	componentDidMount(){
		this.props.fetchData('/flickr',this.props.flickrAct)
	}
	render(){
	let list;
	if (this.props.flickr.images){
		list = this.props.flickr.images.map(image =>{
			return <img 
				className = 'flickr-photo'
				src = {image.url}
				key = {image.key} />
		})
	}
		return(
			<div>
				<p>This shows the flickr API in use. </p>
				{this.props.flickr.images? list: null}
			</div>
		)
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

export default connect(mapStateToProps,mapDispatchToProps)(Headshots);


