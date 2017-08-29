import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../redux/modules/fetchThunk';
import {instaPosts} from '../redux/modules/instaModule';


class Home extends Component{
	componentDidMount(){
		this.props.fetchData('/insta',this.props.instaPosts)
	}
	render(){
		return(
			<div>
				<p>Hello Home!</p>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		user:state.user,
		insta:state.insta
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		instaPosts:(insta)=>dispatch(instaPosts(insta))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);