import React,{Component} from 'react';
import Landing from '../views/Landing.jsx';
<<<<<<< Updated upstream
import NavBar from './NavBar.jsx';
=======
import Admin from '../views/Admin.jsx';
import Home from '../views/Home.jsx';
import About from '../views/About.jsx';
import Photos from '../views/Photos.jsx';
import Videos from '../views/Videos.jsx';
import Music from '../views/Music.jsx';
import Shop from '../views/Shop.jsx';
import Contact from '../views/Contact.jsx';
import Blog from '../views/Blog.jsx';

>>>>>>> Stashed changes
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'


const history = createBrowserHistory();

const ClientRouter =() =>(
	<Router history = {history}>
		<Switch>
			<Route exact path ='/' component={Landing}/>	
			<Route path = '*' component={NavBar}/>
		</Switch>
	</Router>
)

export default ClientRouter;
