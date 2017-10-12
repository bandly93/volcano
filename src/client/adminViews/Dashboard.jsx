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
        this.state={
            display:window.innerWidth <= 812? 'none':'flex'
        }
        this.goHome = this.goHome.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }
    goHome(){
        this.props.history.push('/multimedia');
    }
    showMenu(){
        this.state.display=='none'?this.setState({display:'flex'})
            :this.setState({display:'none'});
    }
    hideMenu(){
        window.innerWidth <= 812?this.setState({display:'none'}):null;
    }
    updateSize(){
        window.innerWidth <=812? this.setState({display:'none'})
            : this.setState({display:'flex'});
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize);
    }   
	render(){
		const path = this.props.match.path;
		return(
			<Router>
				<div className='dashboard'>

                    <nav className='dash-monav'>
                        <div className='profilePic'></div>
                        <a className='hamburger' onClick={this.showMenu}></a>
                        <h1 className='flex-space title'>Volcano Boyz</h1> 
                        <a className='home-icon'onClick={this.goHome} ></a> 
                    </nav>
                    <div className='dash-desk'>
					<nav className='dash-nav'  
                        style={{display:this.state.display}}>
                        <Link to ={`${path}`} onClick={this.hideMenu}>
                            Dash Home</Link>
						<Link to ={`${path}/messages`}onClick={this.hideMenu}>
                            Messages</Link>
						<Link to ={`${path}/blog`} onClick={this.hideMenu}>
                            Post Blog</Link>
						<Link to ={`${path}/upload`} onClick={this.hideMenu}>
                            Upload Images</Link>
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
				</div>
			</Router>
		)
	}	
}
export default Dashboard

