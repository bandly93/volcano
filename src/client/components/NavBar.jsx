import React,{Component} from 'react';
import {connect} from 'react-redux';
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
import {toggleMainNav} from '../redux/modules/viewModule';
//import PropTypes from 'prop-types';
import NavLinks from './NavLinks.jsx';


class NavBar extends Component{
    constructor(){
	    super();
        this.goToLanding = this.goToLanding.bind(this);
    }	
	goToLanding(){
		this.props.history.push('/')
	}
	render(){
        const {toggleMainNav} = this.props;
		return(
			<Router>
				<div className = "nav-container" >
					<nav className ='navBar' >
						<a className='logo' onClick={this.goToLanding}>
							<img/>
						</a>
                        <a className='menuIcon' onClick={toggleMainNav}>
                            <img/>
                        </a>
                        <NavLinks {...this.props}/>
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



const mapStateToProps = (state) =>{
    return{
        view:state.view,
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
        toggleMainNav:()=> dispatch(toggleMainNav())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);

