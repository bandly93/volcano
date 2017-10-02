import React,{Component} from 'react';

function BlogComp({blog}){
	let date = new Date(blog.createdAt);
	return(
		<div className='blog-post' >
			<p className='date'>{date.toDateString()}</p>
			<div className='blog-title'
			dangerouslySetInnerHTML={{__html:blog.htmlTitle}}></div>
			<div dangerouslySetInnerHTML={{__html:blog.htmlBlog}}></div>
			<hr/>
		</div>
	)

	
}
export default BlogComp

