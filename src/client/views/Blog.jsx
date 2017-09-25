import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {adminAct} from '../redux/modules/adminModule';


class Blog extends Component{
	componentDidMount(){
		//this.props.fetchData('/auth/log',this.props.adminAct)
	}
	blogPost(){
		return(
			<form onSubmit={(e)=>{
						e.preventDefault();this.props.postData(
							'/blog','POST',
							{hello:'goodbye'})
							}}>
					<input type='textarea' />
					<input type='submit' value='Post'/>
			</form>
		)
	}
	render(){
		//console.log(this.props.admin)
		return(
			<div>
				{this.props.admin.user? this.blogPost():null}
				<p>Hello blog!</p>
			</div>
		)
	}	
}

const mapStateToProps = (state) =>{
	return{
		admin:state.admin
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		adminAct:(admin)=>dispatch(adminAct(admin))	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog)

