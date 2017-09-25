import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Messages from './Messages.jsx';
import PostBlog from './PostBlog.jsx';

class Dashboard extends Component{
	render(){
		const path = this.props.match.path;
		return(
			<Router>
				<div className='dashboard'>
					<p>Hello Dashboard!</p>
					<nav className='dash-nav'>
						<Link to ={`${path}/messages`}>Messages</Link>
						<Link to ={`${path}/blog`}>Post Blog</Link>
						<a>test</a>
					</nav>
				
					<Switch>
						<Route exact path= {`${path}/messages`} component ={Messages}/>
						<Route exact path= {`${path}/blog`} component ={PostBlog}/>
					</Switch>
				</div>
			</Router>
		)
	}	
}
export default Dashboard

