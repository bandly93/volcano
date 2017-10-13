import React,{Component} from 'react';
import {Link} from 'react-router-dom';


function Landing(){
	return(
		<div className='landing'>
			<img />
			<h1>Multimedia Production</h1>
			<h1>Photos + Videos</h1>
            <br/>
            <Link to ='/multimedia'>Enter</Link>
		</div>
	)

	
}
export default Landing
