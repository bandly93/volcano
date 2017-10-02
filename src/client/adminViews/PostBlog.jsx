import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {blogAct} from '../redux/modules/blogModule';
var marked = require('marked');


class PostBlog extends Component{
	constructor(props){
		super(props);
		this.state={
			title:'',
			blog:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.blogPost = this.blogPost.bind(this);
	}
	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}
	blogPost(e){
		e.preventDefault();
		//console.log(this.props)
		let obj={
			rawTitle:this.state.title,
			htmlTitle:marked(this.state.title),
			rawBlog:this.state.blog,
			htmlBlog:marked(this.state.blog)
		}
		this.props.postData('/blog','POST',obj,this.props.blogAct);
		this.setState({
			title:'',
			blog:''
		})		
	}
	render(){
		return(
			<div className='dash-container'>
				{this.props.blog.msg?<h3 className='success'>Blog posted!</h3>:null}
				<form onSubmit={this.blogPost} >
					<textarea rows='2' name='title'
					placeholder='title' value={this.state.title}
					onChange={this.handleChange}>
					</textarea>
					<textarea rows='20' name='blog' 
					placeholder='body' value={this.state.blog}
					onChange={this.handleChange}>
					</textarea>
					<br/>
					<input type='submit' value='Post'/>
				</form>
				<hr/>
				<h2>Preview</h2>
				<div className="preview" dangerouslySetInnerHTML={{__html:marked(this.state.blog)}}>
	  			</div>
			</div>
		)
	}	
}
const mapStateToProps = (state) =>{
	return{
		blog:state.blog
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		blogAct:(blog)=>dispatch(blogAct(blog))	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog)

