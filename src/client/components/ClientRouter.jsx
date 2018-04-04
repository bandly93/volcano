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
import Admin from  '../views/Admin.jsx';
import Error from '../views/Error.jsx';
import Register from '../views/Register.jsx';
import Login from '../views/Login.jsx';

const history = createBrowserHistory();

const ClientRouter =(props) =>(
	<Router history = {history}>
		<Switch>
			<Route exact path ='/' component={Landing}/>
            <Route path = '/admin' component={Admin}/>
            <Route path = '/register' component = {Register}/>
            <Route path = '/login' component = {Login}/>
            <Route path ='/dashboard' component ={Dashboard}/>	
			<Route path = '/h' component={NavBar}/>
            <Route path = '*' component={Error}/>
		</Switch>
	</Router>
)
export default ClientRouter;
