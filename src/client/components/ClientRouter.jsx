import React,{Component} from 'react';
import Landing from '../views/Landing.jsx';
import Admin from '../views/Admin.jsx';
import Home from '../views/home.jsx';
import About from '../views/About.jsx';
import Photos from '../views/Photos.jsx';
import Videos from '../views/Videos.jsx';
import Music from '../views/Music.jsx';
import Shop from '../views/Shop.jsx';
import Contact from '../views/Contact.jsx';
import Blog from '../views/Blog.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const ClientRouter =() =>(
	<Router>
		<Switch>
			<Route path = '/admin' component={Admin}/>	
			<Route exact path ='/' component={Landing}/>	
			<Route exact path= '/about' component ={About}/>
			<Route exact path= '/photos' component ={Photos}/>
			<Route exact path= '/videos' component ={Videos}/>
			<Route exact path= '/music' component ={Music}/>
			<Route exact path= '/shop' component ={Shop}/>
			<Route exact path= '/contact' component ={Contact}/>
			<Route exact path= '/blog' component ={Blog}/>
		</Switch>
	</Router>
)

export default ClientRouter;