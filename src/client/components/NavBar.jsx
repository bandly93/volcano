import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import About from '../views/About.jsx';
import Multimedia from '../views/Multimedia.jsx';
import {withRouter} from "react-router-dom";
import {toggleMainNav} from '../redux/modules/viewModule';
//import PropTypes from 'prop-types';
import NavLinks from './NavLinks.jsx';
import Blog from '../views/Blog.jsx';
import logo from '../public/images/logos/volc.jpg';
import menu from '../public/images/icons/menu.svg';



class NavBar extends Component{
    constructor(){
	    super();
        this.goToLanding = this.goToLanding.bind(this);
    }	
	goToLanding(){
		this.props.history.push('/')
	}
	render(){
	    const path = this.props.match.path;
        const {toggleMainNav} = this.props;
        const titles =[
            {link: '/multimedia',title:'Multimedia',comp:Multimedia},
            {link:'/about' , title:'About+Contact',comp:About },
            {link:'/blog' , title:'Blog',comp:Blog },
           ];
        const routes = titles.map(each => 
            <Route exact path={path+each.link}  component={each.comp} 
                key={each.link}/>
        ) 
		return(
			<Router>
				<div className = "nav-container" >
					<nav className ='navBar' >
						<a className='logo' onClick={this.goToLanding}>
							<img src = '/volc.jpg' />
						</a>
            <a className='menuIcon' onClick={toggleMainNav}>
                <img src= '/menu.svg' />
            </a>
            <NavLinks {...this.props} path={path} titles={titles}/>
					</nav>
            <div className = 'nav-views'>
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
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
        toggleMainNav:()=> dispatch(toggleMainNav()),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);

