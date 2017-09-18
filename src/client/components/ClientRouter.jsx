import React,{Component} from 'react';
import Landing from '../views/Landing.jsx';
import NavBar from './NavBar.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const ClientRouter =() =>(
	<Router>
		<Switch>
			<Route exact path ='/' component={Landing}/>	
			<Route exact path = '/about' component={NavBar}/>
		</Switch>
	</Router>
)

export default ClientRouter;