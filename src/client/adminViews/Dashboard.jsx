import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Messages from './Messages.jsx';

class Dashboard extends Component{
	render(){
		return(
			<Router>
				<div className='dashboard'>
					<p>Hello Dashboard!</p>
					<nav className='dash-nav'>
						<Link to ='/messages'>Messages</Link>
					</nav>
				
					<Switch>
						<Route exact path= '/messages' component ={Messages}/>
					</Switch>
				</div>
			</Router>
		)
	}	
}
export default Dashboard

