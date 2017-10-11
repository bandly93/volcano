import React from 'react';
import {Link} from 'react-router-dom';

function Paginate({page,modelID,path}){
    let paginate = modelID();
    return(
        <div className='paginate'>
                {page.new?
                    <Link to = {`${path}?new=${paginate.new}`}>Newer</Link>
                    :<a></a>}
                {page.old?
                    <Link to = {`${path}?old=${paginate.old}`}>Older</Link>
                    :<a></a>}
       </div>
    )
}
export default Paginate
