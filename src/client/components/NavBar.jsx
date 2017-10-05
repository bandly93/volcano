import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Admin from  '../views/Admin.jsx';
import About from '../views/About.jsx';
import Multimedia from '../views/Multimedia.jsx';
import Shop from '../views/Shop.jsx';
import Blog from '../views/Blog.jsx';
import {withRouter} from "react-router-dom";
//import PropTypes from 'prop-types';


class NavBar extends Component{
    constructor(){
	    super();
    }	
	goToLanding(){
		this.props.history.push('/')
	}
	render(){
		return(
			<Router>
				<div className = "nav-container">
					<nav className ='navBar'>
						<a className='menuIcon'><img src='https://i.imgur.com/659zR69.png'/></a>
						
						<a className='logo' onClick={()=>this.goToLanding()}>
							<img src='https://i.imgur.com/61r6Xw7.png'/>
						</a>
						<span className='flex-space'></span>
						<Link to = '/multimedia'>Multimedia</Link>
						<Link to ='/about'>About+Contact</Link>
						<Link to ='/shop'>Shop</Link>
						<Link to ='/blog'>Blog</Link>
					</nav>
					<Switch>
						<Route path = '/admin' component={Admin}/>
						<Route exact path= '/about' component ={About}/>
						<Route path= '/multimedia' component ={Multimedia}/>
						<Route exact path= '/shop' component ={Shop}/>
						<Route path= '/blog' component ={Blog}/>
					</Switch>
				</div>
			</Router>
		)
	}
}



export default withRouter(NavBar);

