import React,{Component} from 'react';
import {Link} from 'react-router-dom';

const NavLinks= ()=>{
    return(
        <span className='navLinks'>
            <nav>
                <Link to = '/multimedia'>Multimedia</Link>
                <Link to ='/about'>About+Contact</Link>
                <Link to ='/shop'>Shop</Link>
                <Link to ='/blog'>Blog</Link>
            </nav>
        </span>
   ) 
}

export default NavLinks;
