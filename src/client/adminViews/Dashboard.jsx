import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Messages from './Messages.jsx';
import PostBlog from './PostBlog.jsx';
import Upload from './Upload.jsx';
import UploadTest from "./TestingUpload.jsx";
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
						<Link to ={`${path}/upload`}>Upload Images</Link>
						<a>test</a>
					</nav>
				
					<Switch>
						<Route exact path= {`${path}/messages`} component ={Messages}/>
						<Route exact path= {`${path}/blog`} component ={PostBlog}/>
						<Route exact path= {`${path}/upload`} component = {UploadTest}/>
					</Switch>
				</div>
			</Router>
		)
	}	
}
export default Dashboard

