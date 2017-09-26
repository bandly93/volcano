import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';


class PostBlog extends Component{
	constructor(props){
		super(props);
		this.state={
			blog:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.blogPost = this.blogPost.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	blogPost(e){
		e.preventDefault();
		//console.log(this.props)
		this.props.postData('/blog','POST',{blog:this.state.blog})				
	}
	render(){
		return(
			<form onSubmit={this.blogPost} className='dash-container'>
					<textarea rows='20' name='blog' value={this.state.blog}
					onChange={this.handleChange}>
					</textarea>
					<br/>
					<input type='submit' value='Post'/>
			</form>
		)
	}	
}
const mapStateToProps = (state) =>{
	return{

	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog)

