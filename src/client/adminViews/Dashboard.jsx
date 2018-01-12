import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Messages from './Messages.jsx';
import PostBlogContainer from '../adminContainers/PostBlogContainer.jsx';
import UploadTest from "./TestingUpload.jsx";
import DashHome from './DashHome.jsx';
import ProfilePic from '../public/images/about/profile.jpg';
import {toggleDashNav} from '../redux/modules/viewModule';
import MyEditor from './TestBlog.jsx';
import EditBlogs from './EditBlogs.jsx';

class Dashboard extends Component{
    constructor(){
        super();
        this.goHome = this.goHome.bind(this);
    }
    componentWillReceiveProps(nextProps){
        /*
        if(!nextProps.admin.user) {
            this.props.history.push('/multimedia');
        }
        */
    } 
    goHome(){
        this.props.history.push('/multimedia');
    }
	render(){
	    const path = this.props.match.path;
        const {toggleDashNav} = this.props;
        const {screenWidth,display} = this.props.view;
        const titles = [
            {link:'', title:'Dash Home', comp:DashHome},
            {link:'/messages', title:'Messages', comp:Messages},
            {link:'/blog', title:'Post Blog', comp:PostBlogContainer},
            {link:'/upload', title:'Upload', comp:UploadTest},
//            {link:'/test', title:'Post Blog', comp:MyEditor},
            {link:'/editblog',title:'Edit Blogs',comp:EditBlogs}
        ];
        const links = titles.map(e=>
            <Link to={`${path}${e.link}`} onClick={toggleDashNav} key={e.link}>
                {e.title}
            </Link>
        )
        const routes = titles.map(e =>
            <Route exact path={`${path}${e.link}`} component={e.comp}
                key={e.link}/>
        )
		return(
			<Router>
				<div className='dashboard'>
					<nav className='dash-sidenav' style={{display:display}}>
                        <div className='profile-pic'>
                            <img></img>
                            <p>Phuong Dang</p>
                        </div>
                        {links}
					</nav>

                    <div className='dash-view'>
                        <nav className='dash-topnav'>
                            <a className='hamburger' onClick={toggleDashNav}></a>
                            <h1 className='flex-space title'>Volcano Boyz</h1> 
                            <a className='home-icon'onClick={this.goHome} ></a> 
                        </nav>
                        <Switch>
                            {routes}
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
        admin: state.admin
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
        toggleDashNav:()=> dispatch(toggleDashNav())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)

