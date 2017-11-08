import React,{Component} from 'react';
import {Link} from 'react-router-dom';

const NavLinks= (props)=>{
    const {toggleMainNav,titles} = props;
    const {navLinks} = props.view;
    const mappedLinks = titles.map(each =>
        <Link to = {each.link} onClick={toggleMainNav} key={each.title}>
            {each.title}
        </Link>
    )
    return(
        <span className='navLinks' style={{display:navLinks}}>  
            {mappedLinks}
        </span>
   ) 
}

export default NavLinks;

//style={{flexDirection:navDisplay}}
