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
import DashHome from './DashHome.jsx';

class Dashboard extends Component{
    constructor(){
        super();
        this.goHome = this.goHome.bind(this);
    }
    goHome(){
        this.props.history.push('/multimedia');
    }
	render(){
		const path = this.props.match.path;
		return(
			<Router>
				<div className='dashboard'>
                    <a onClick={this.goHome}>Home</a>
					<nav className='dash-nav'>
                        <Link to ={`${path}`}>DashHome</Link>
						<Link to ={`${path}/messages`}>Messages</Link>
						<Link to ={`${path}/blog`}>Post Blog</Link>
						<Link to ={`${path}/upload`}>Upload Images</Link>
					</nav>
				
					<Switch>
                        <Route exact path= {`${path}`}
                             component = {DashHome} />
						<Route exact path= {`${path}/messages`}
                             component ={Messages}/>
						<Route exact path= {`${path}/blog`}
                             component ={PostBlog}/>
						<Route exact path= {`${path}/upload`} 
                             component = {UploadTest}/>
					</Switch>
				</div>
			</Router>
		)
	}	
}
export default Dashboard

