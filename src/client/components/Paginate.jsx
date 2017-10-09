import React from 'react';
import {Link} from 'react-router-dom';

function Paginate({page,modelID,path}){
    let paginate = modelID();
    return(
        <div className='paginate'>
                {page.new?
                    <Link to = {`${path}?new=${paginate.new}`}>Newer</Link>
                    :null}
                {page.old?
                    <Link to = {`${path}?old=${paginate.old}`}>Older</Link>
                    :null}
       </div>
    )
}
export default Paginate
