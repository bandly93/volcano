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


function NavBar(){
	return(
		<Router>
			<div>
				<nav className ='navBar'>
					<a className='menuIcon'><img src='http://i.imgur.com/froRRg3.png'/></a>
					<Link to ='/'>Home</Link>
					<Link to ='/'>About</Link>

					<div className="dropdown">
					   <Link to ='/'>Photos</Link>
					   <div className="dropdown-content">
							<a href="#">Fashion</a>
					      <a href="#">Wedding</a>
					      <a href="#">Headshots</a>
					      <a href="#">Portraits</a>
					   </div>
					</div>

					<div className="dropdown">
					   <Link to ='/'>Videos</Link>
					   <div className="dropdown-content">
							<a href="#">Lookbooks</a>
					      <a href="#">Short Films</a>
					      <a href="#">Music Videos</a>
					      <a href="#">Weddings</a>
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
			</div>
		</Router>
	)
}

export default NavBar