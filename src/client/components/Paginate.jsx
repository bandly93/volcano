import React from 'react';
import {Link} from 'react-router-dom';


function Paginate({getPage,blogID,path}){
    //<Link to = {`${path}/old={${blogID().old}`}>
    const say=()=>{
        console.log(`${path}/old=${blogID().old}`)
    }
    let list=()=>{
	    return(
            <span>
                <Link to = {`${path}?new=${blogID().new}`}>Newer</Link>   
                <Link to = {`${path}?old=${blogID().old}`}>Older</Link>  
            </span> 
        )	
	}
    return(
    <div className='paginate'>
        {list()}
    </div>
)
/*
return(
	<div className='paginate'>
		<button onClick={()=>getPage(blogID().new)}>Newer</button>
		<button onClick={()=>say()}>Older</button>
	</div>
)
*/
}
export default Paginate
