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
const ColoredLinks = ({ label, to, activeOnlyWhenExact }) => (
    <Route
        path = {to}
        exact= {activeOnlyWhenExact}
        children = {( { match }) => (
            <span id = {match ? 'active' : ''}>
                <Link to={to}>{label}</Link>
            </span>
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
            onClick={toggleMainNav} 
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

