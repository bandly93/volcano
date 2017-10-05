import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {blogAct} from '../redux/modules/blogModule';
import BlogComp from '../components/BlogComp.jsx';
import Paginate from '../components/Paginate.jsx';

class Blog extends Component{
	constructor(props){
		super(props);
		this.blogID = this.blogID.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
	}
	componentDidMount(){
        console.log('did mount',this.props.match.path,location.search);
        this.props.fetchData(`/blog/data/${location.search}`,this.props.blogAct)
	}
    componentWillReceiveProps(nextProps){
        if(nextProps.location.search !== this.props.location.search){
            console.log('will mount',nextProps.match.path,
            nextProps.location.search);               
 
            this.props.fetchData(`/blog/data/${nextProps.location.search}`,
                this.props.blogAct)
        } 
    //this.props.fetchData(`/blog/data/${location.search}`,this.props.blogAct)
       // console.log('will mount',nextProps.match.path,
       //     nextProps.location.search);
    }
	list(){
		return this.props.blog.map(blog=>
			<BlogComp key ={blog._id} blog={blog}/>
		)		
	}
	getNextPage(param){
		console.log(param)
        let id = {id:param};
		this.props.postData(`/blog/${location.search}`,'POST',id,this.props.blogAct);
	}
	blogID(){
        if(this.props.blog[0]){
            let obj ={};
            let blog = this.props.blog;
            obj.new = blog[0]._id;
            obj.old = blog[blog.length-1]._id;
            return obj;
        }
        else{
            return {};
        }
	}
	render(){
		return(
			<div>
				<h2>Volcano Boyz Blog</h2>
				{this.props.blog?this.list():null}
				<Paginate getPage={this.getNextPage} 
                path = {this.props.match.path}
                blogID={this.blogID}/>
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

