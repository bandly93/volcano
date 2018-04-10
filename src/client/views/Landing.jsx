import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import landing from '../public/images/logos/logo2.jpg';

function Landing(){
	return(
		<div className='landing'>
            <div className='landing-img'>
                <img src= { landing } />
            </div>
            <Link to ='/h/multimedia'>ENTER</Link>
		</div>
	)	
}
export default Landing
