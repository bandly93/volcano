import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';

class Portraits extends Component{
	componentDidMount(){
		this.props.fetchData('/flickr',this.props.flickrAct)
	}

	render(){
	let list;
	if (this.props.flickr.images){
		list = this.props.flickr.images.map(photo =>{
			return <img 
				className = 'flickr-photo'
				src = {photo.photo}
				key = {photo.id} />
		})
	}
		return(
			<div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Portraits);


