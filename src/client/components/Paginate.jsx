import React from 'react';
import {Link} from 'react-router-dom';

function Paginate({page,blogID,path}){
    let paginate = blogID();
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
