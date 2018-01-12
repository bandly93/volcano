import React,{Component} from 'react';
import Landing from '../views/Landing.jsx';
import NavBar from './NavBar.jsx';
import Dashboard from '../adminViews/Dashboard.jsx';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

const ClientRouter =(props) =>(
	<Router history = {history}>
		<Switch>
			<Route exact path ='/' component={Landing}/>
            <Route path ='/dashboard' component ={Dashboard}/>	
			<Route path = '*' component={NavBar}/>
		</Switch>
	</Router>
)
export default ClientRouter;
