import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from '../views/home.jsx';
import About from '../views/About.jsx';
import Photos from '../views/Photos.jsx';
import Videos from '../views/Videos.jsx';
import Music from '../views/Music.jsx';
import Shop from '../views/Shop.jsx';
import Contact from '../views/Contact.jsx';
import Blog from '../views/Blog.jsx';
import Fashion from '../subViews/Fashion.jsx';
import Headshots from '../subViews/Headshots.jsx';
import Lookbooks from '../subViews/Lookbooks.jsx';
import MusicVideos from '../subViews/MusicVideos.jsx';
import Portraits from '../subViews/Portraits.jsx';
import ShortFilms from '../subViews/ShortFilms.jsx';
import Wedding from '../subViews/Wedding.jsx';


function NavBar(){
	return(
		<Router>
			<div>
				<nav className ='navBar'>
					<a className='menuIcon'><img src='https://i.imgur.com/froRRg3.png'/></a>
					<Link to ='/'>Home</Link>
					<Link to ='/about'>About</Link>

					<div className="dropdown">
					   <Link to ='/photos'>Photos</Link>
					   <div className="dropdown-content">
							<Link to = "/fashion">Fashion</Link>
					      <Link to = "/wedding">Wedding</Link>
					      <Link to = "/headshots">Headshots</Link>
					      <Link to = "/portraits">Portraits</Link>
					   </div>
					</div>

					<div className="dropdown">
					   <Link to ='/videos'>Videos</Link>
					   <div className="dropdown-content">
							<Link to = "/lookbooks">Lookbooks</Link>
					      <Link to = "/shortfilms">Short Films</Link>
					      <Link to = "/musicvideos">Music Videos</Link>
					      <Link to = "/weddings">Weddings</Link>
					   </div>
					</div>
					<Link to='/music'>Music</Link>
					<Link to='/shop'>Shop</Link>
					<Link to='/contact'>Contact</Link>
					<Link to='/blog'>Blog</Link>
				</nav>

				<Route exact path= '/' component ={Home}/>
				<Route exact path= '/about' component ={About}/>
				<Route exact path= '/photos' component ={Photos}/>
				<Route exact path= '/videos' component ={Videos}/>
				<Route exact path= '/music' component ={Music}/>
				<Route exact path= '/shop' component ={Shop}/>
				<Route exact path= '/contact' component ={Contact}/>
				<Route exact path= '/blog' component ={Blog}/>
				<Route exact path= '/fashion' component ={Fashion}/>
				<Route exact path= '/headshots' component ={Headshots}/>
				<Route exact path= '/lookbooks' component ={Lookbooks}/>
				<Route exact path= '/musicvideos' component ={MusicVideos}/>
				<Route exact path= '/portraits' component ={Portraits}/>
				<Route exact path= '/shortfilms' component ={ShortFilms}/>
				<Route exact path= '/weddings' component ={Wedding}/>
	
			</div>
		</Router>
	)
}

export default NavBar