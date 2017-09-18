import React,{Component} from 'react';
import {Link} from 'react-router-dom';


function Landing(){
	return(
		<div className='landing'>
			<img src='https://i.imgur.com/Ati7QzX.png'/>
			<h1>Multimedia Production</h1>
			<h1>Photos + Videos</h1>
			<Link to ='/about'><button>Enter</button></Link>
		</div>
	)

	
}
export default Landing