import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Admin from '../views/Admin.jsx';
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
import WeddingPhotos from '../subViews/WeddingPhotos.jsx';
import WeddingVideos from '../subViews/WeddingVideos.jsx';

class NavBar extends Component{
	render(){
		return(
			<Router>
				<div>
					<nav className ='navBar'>
						<a className='menuIcon'><img src='https://i.imgur.com/froRRg3.png'/></a>
						<Link to ='/'>Home</Link>
						<Link to ='/about'>About</Link>

						<div className="dropdown">
							<div className = "dropdown-wrapper">
						   	<Link to ='/photos'>Photos<span className = "caret">&#9660;</span> </Link>
						   </div>	
						   <div className="dropdown-content">
								<Link to = "/photos/fashion">Fashion</Link>
						      <Link to = "/photos/wedding">Wedding</Link>
						      <Link to = "/photos/headshots">Headshots</Link>
						      <Link to = "/photos/portraits">Portraits</Link>
						   </div>
						</div>

						<div className="dropdown">
							<div className = "dropdown-wrapper">
						   	<Link to ='/videos'>Videos<span className ="caret">&#9660;</span> </Link>
						   </div>
						   <div className="dropdown-content">
								<Link to = "/videos/lookbooks">Lookbooks</Link>
						      <Link to = "/videos/shortfilms">Short Films</Link>
						      <Link to = "/videos/musicvideos">Music Videos</Link>
						      <Link to = "/videos/wedding">Wedding</Link>
						   </div>
						</div>
						<Link to='/music'>Music</Link>
						<Link to='/shop'>Shop</Link>
						<Link to='/contact'>Contact</Link>
						<Link to='/blog'>Blog</Link>
					</nav>
					<Switch>
						<Route path = '/admin' component={Admin} />
						<Route exact path= '/' component ={Home}/>
						<Route exact path= '/about' component ={About}/>
						<Route exact path= '/photos' component ={Photos}/>
						<Route exact path= '/videos' component ={Videos}/>
						<Route exact path= '/music' component ={Music}/>
						<Route exact path= '/shop' component ={Shop}/>
						<Route exact path= '/contact' component ={Contact}/>
						<Route exact path= '/blog' component ={Blog}/>

						<Route exact path= '/photos/fashion' component ={Fashion}/>
						<Route exact path= '/photos/wedding' component ={WeddingPhotos}/>
						<Route exact path= '/photos/headshots' component ={Headshots}/>
						<Route exact path= '/photos/portraits' component ={Portraits}/>
						<Route exact path= '/videos/lookbooks' component ={Lookbooks}/>
						<Route exact path= '/videos/shortfilms' component ={ShortFilms}/>
						<Route exact path= '/videos/musicvideos' component ={MusicVideos}/>
						<Route exact path= '/videos/wedding' component ={WeddingVideos}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default NavBar