import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {blogAct} from '../redux/modules/blogModule';
import BlogComp from '../components/BlogComp.jsx';


class Blog extends Component{
	componentDidMount(){
		this.props.fetchData('/blog/data',this.props.blogAct)
	}
	list(){
		return this.props.blog.map(blog=>
			<BlogComp key ={blog._id} blog={blog}/>
		)
		
	}
	render(){
		return(
			<div>
				<h2>Volcano Boyz Blog</h2>
				{this.props.blog?this.list():null}
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

export default connect(mapStateToProps,mapDispatchToProps)(Blog)

