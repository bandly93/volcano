import React,{Component} from 'react';
import {connect} from 'react-redux';
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
import ProfilePic from '../public/images/about/profile.jpg';
import {toggleMenu} from '../redux/modules/viewModule';


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
        const {toggleMenu} = this.props;
        const {screenWidth,display} = this.props.view;
		return(
			<Router>
				<div className='dashboard'>
					<nav className='dash-sidenav' style={{display:display}}>
                        <div className='profile-pic'>
                        <img></img>
                        <p>Phuong Dang</p>
                        </div>
                        <Link to ={`${path}`} onClick={toggleMenu}>
                            Dash Home</Link>
						<Link to ={`${path}/messages`}onClick={toggleMenu}>
                            Messages</Link>
						<Link to ={`${path}/blog`} onClick={toggleMenu}>
                            Post Blog</Link>
						<Link to ={`${path}/upload`} onClick={toggleMenu}>
                            Upload Images</Link>
					</nav>

                    <div className='dash-view'>
                        <nav className='dash-topnav'>
                            <a className='hamburger' onClick={toggleMenu}></a>
                            <h1 className='flex-space title'>Volcano Boyz</h1> 
                            <a className='home-icon'onClick={this.goHome} ></a> 
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


const mapStateToProps = (state) =>{
    return{
        view:state.view,
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
        toggleMenu:()=> dispatch(toggleMenu())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)

