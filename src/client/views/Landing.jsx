import React,{Component} from 'react';
import Admin from './Admin.jsx';
import Home from './home.jsx';
import About from './About.jsx';
import Photos from './Photos.jsx';
import Videos from './Videos.jsx';
import Music from './Music.jsx';
import Shop from './Shop.jsx';
import Contact from './Contact.jsx';
import Blog from './Blog.jsx';
import Fashion from '../subViews/Fashion.jsx';
import Headshots from '../subViews/Headshots.jsx';
import Lookbooks from '../subViews/Lookbooks.jsx';
import MusicVideos from '../subViews/MusicVideos.jsx';
import Portraits from '../subViews/Portraits.jsx';
import ShortFilms from '../subViews/ShortFilms.jsx';
import WeddingPhotos from '../subViews/WeddingPhotos.jsx';
import WeddingVideos from '../subViews/WeddingVideos.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


function Landing(){
	return(
		<div className='landing'>
			<img src='https://i.imgur.com/Ati7QzX.png'/>
			<h1>Multimedia Production</h1>
			<h1>Photos + Videos</h1>
			
			<button>Enter</button>
		</div>
	)

	
}
export default Landing