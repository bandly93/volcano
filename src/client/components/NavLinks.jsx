import React,{Component} from 'react';
import {Route, Link} from 'react-router-dom';

/*
const NavLinks= (props)=>{
    const {toggleMainNav,titles,path} = props;
    const {navLinks} = props.view;
    const mappedLinks = titles.map(each =>
        <Link to = {path+each.link} onClick={toggleMainNav} key={each.title}>
            {each.title}
        </Link>
    )
    return(
        <span className='navLinks' style={{display:navLinks}}>  
            {mappedLinks}
        </span>
   ) 
}
*/
const ColoredLinks = ({ label, to, activeOnlyWhenExact, toggleMainNav }) => (

    <Route
        path = {to}
        exact= {activeOnlyWhenExact}
        children = {(props) => (
            <Link id = {props.match ? 'active' : ''} 
                onClick={toggleMainNav} 
                to={to} >
                {label}
            </Link>
        )}
    />
)


const NewLinks= (props)=>{
    const {toggleMainNav,titles,path} = props;
    const {navLinks} = props.view;
    const mappedLinks = titles.map(each =>
        <ColoredLinks 
            activeOnlyWhenExact={true}
            to = {path+each.link} 
            toggleMainNav={toggleMainNav} 
            key={each.title}
            label={each.title}
        />
    )
    return(
        <span className='navLinks' style={{display:navLinks}}>  
            {mappedLinks}
        </span>
   ) 
}

//export default NavLinks;
export default NewLinks;

