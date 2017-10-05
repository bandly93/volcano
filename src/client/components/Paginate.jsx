import React from 'react';
import {Link} from 'react-router-dom';


function Paginate({getPage,blogID,path}){
    return(
        <div className='paginate'>
            <Link to = {`${path}?new=${blogID().new}`}>Newer</Link>   
            <Link to = {`${path}?old=${blogID().old}`}>Older</Link>
       </div>
    )
}
export default Paginate
