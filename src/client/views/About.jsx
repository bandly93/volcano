import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';


const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					
class About extends Component{
	componentDidMount(){
		this.props.fetchData('/flickr',this.props.flickrAct)
	}

	render(){
		return(
			<div className = "about-container">
				<div className = "top-row">
					<span>Phuong</span>
					<span>Xinh</span>

				</div>
				<div className = "middle-row">
					<span>Alex</span>
					<span>Dizzy</span>
					<span>Geoffrey</span>
				</div>
				<div className = "bottom-row">
					<span>Chan</span>
				</div>

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

export default connect(mapStateToProps,mapDispatchToProps)(About);


