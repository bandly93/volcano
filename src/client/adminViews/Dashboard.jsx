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
		const path = this.props.match.path;
		return(
			<Router>
				<div className='dashboard'>
					<p>Hello Dashboard!</p>
					<nav className='dash-nav'>
						<Link to ={`${path}/messages`}>Messages</Link>
						<a>test</a>
					</nav>
				
					<Switch>
						<Route exact path= {`${path}/messages`} component ={Messages}/>
					</Switch>
				</div>
			</Router>
		)
	}	
}
export default Dashboard

