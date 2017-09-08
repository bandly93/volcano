import React,{Component} from 'react';
import { connect } from 'react-redux';
import {postData} from '../redux/modules/fetchThunk';

class Blog extends Component{

	render(){
		return(
			<div>
			<form onSubmit={(e)=>{
						e.preventDefault();this.props.postData(
							'/blog','POST',
							{hello:'goodbye'})
							}}>
					<input type='textarea' />
					<input type='submit' value='Post'/>
				</form>
			</div>
		)
	}	
}

const mapStateToProps = (state) =>{
	return{
		
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc))	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog)

