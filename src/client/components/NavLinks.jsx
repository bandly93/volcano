import React,{Component} from 'react';
import {Link} from 'react-router-dom';

const NavLinks= (props)=>{
    const {toggleMainNav} = props;
    const {navLinks} = props.view;
    return(
        <span className='navLinks' style={{display:navLinks}}>
            <Link to = '/multimedia' onClick={toggleMainNav}>
                Multimedia
            </Link>
            <Link to ='/about' onClick={toggleMainNav}>
                About+Contact
            </Link>
            <Link to ='/shop' onClick={toggleMainNav}>
                Shop
            </Link>
            <Link to ='/blog' onClick={toggleMainNav}>
                Blog
            </Link>
        </span>
   ) 
}

export default NavLinks;

//style={{flexDirection:navDisplay}}
