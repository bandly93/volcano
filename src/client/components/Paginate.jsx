import React from 'react';
import {Link} from 'react-router-dom';


function Paginate({getPage,blogID,param}){
    //<Link to = {`${param}/old={${blogID().old}`}>
   const say=()=>{
    console.log(`${param}/old={${blogID().old}`)
   }
   /*
   return(
        <div className='paginate'>
            <Link to = {`${param}/old=${blogID().old}`}>Older</Link>
        </div>
   )*/
   
	return(
		<div className='paginate'>
			<button onClick={()=>getPage(blogID().new)}>Newer</button>
			<button onClick={()=>say()}>Older</button>
		</div>
	)
}
export default Paginate
