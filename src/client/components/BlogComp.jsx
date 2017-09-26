import React,{Component} from 'react';

function BlogComp({blog}){

	return(
		<div className='blog-post'>
			<p>{blog.blog}</p>
		</div>
	)

	
}
export default BlogComp

