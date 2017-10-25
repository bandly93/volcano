import React,{Component} from 'react';
import {Link} from 'react-router-dom';

const NavLinks= (props)=>{
    const {toggleMenu} = props;
    const {screenWidth,display,navDisplay,navContainer} = props.view;
    return(
        <span className='navLinks' style={{display:navContainer}}>
            <nav style={{display:navDisplay}}>
                <Link to = '/multimedia'>Multimedia</Link>
                <Link to ='/about'>About+Contact</Link>
                <Link to ='/shop'>Shop</Link>
                <Link to ='/blog'>Blog</Link>
            </nav>
        </span>
   ) 
}

export default NavLinks;

//style={{flexDirection:navDisplay}}
