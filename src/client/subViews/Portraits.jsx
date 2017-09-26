import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';
import SlideShow from '../components/SlideShow.jsx';

class Portraits extends Component{
	componentDidMount(){
		this.props.fetchData('/flickr',this.props.flickrAct)
	}
	render(){
		return(
			<div>
			<p>hello portraits</p>
				
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


