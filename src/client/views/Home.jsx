import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../redux/modules/fetchThunk';
import {instaAct} from '../redux/modules/instaModule';


class Home extends Component{

	componentDidMount(){
		this.props.fetchData('/insta',this.props.instaAct)
	}
	render(){
	let list;
	if(this.props.insta.images){
		list = this.props.insta.images.map((image,index)=>{
			
			return <img 
				className = 'insta-photo'
				src = {image.image} 
				key = {image.key} />
		})
	}
		return(
			<div>
				{this.props.insta.images? list: null}
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		insta:state.insta
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		instaAct:(insta)=>dispatch(instaAct(insta))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);