import React,{Component} from 'react';
import {Link} from 'react-router-dom';


function Landing(){
	return(
		<div className='landing'>
			<img />
			<h1>Photos + Videos</h1>
            <br/>
            <Link to ='/h/multimedia'>Enter</Link>
		</div>
	)	
}
export default Landing
