import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Admin from '../views/Admin.jsx';
<<<<<<< Updated upstream
=======
import Home from '../views/Home.jsx';
>>>>>>> Stashed changes
import About from '../views/About.jsx';
import Photos from '../views/Photos.jsx';
import Shop from '../views/Shop.jsx';
import Blog from '../views/Blog.jsx';
import {withRouter} from "react-router-dom";
//import PropTypes from 'prop-types';


class NavBar extends Component{
<<<<<<< Updated upstream
	super(props){
		constructor(props);
	}
	goToLanding(){
		this.props.history.push('/')
	}
=======
>>>>>>> Stashed changes
	render(){
		return(
			<Router>
				<div>
					<nav className ='navBar'>
						<a className='menuIcon'><img src='https://i.imgur.com/659zR69.png'/></a>
						<a onClick={()=>this.goToLanding()}>Home</a>
						<Link to = '/multimedia'>Multimedia</Link>
						<Link to ='/about'>About+Contact</Link>
						<Link to ='/shop'>Shop</Link>
						<Link to ='/blog'>Blog</Link>
					</nav>
					<Switch>
						<Route path = '/admin' component={Admin}/>
						<Route exact path= '/about' component ={About}/>
						<Route exact path= '/multimedia' component ={Photos}/>
						<Route exact path= '/shop' component ={Shop}/>
						<Route exact path= '/blog' component ={Blog}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

<<<<<<< Updated upstream

export default withRouter(NavBar);
=======
export default NavBar
>>>>>>> Stashed changes
