import React,{Component} from 'react';
import Landing from '../views/Landing.jsx';
import NavBar from './NavBar.jsx';
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
