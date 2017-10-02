import React from 'react';

function Paginate({getPage,blogID}){

	return(
		<div className='paginate'>
			<button onClick={()=>getPage(blogID().new)}>Newer</button>
			<button onClick={()=>getPage(blogID().old)}>Older</button>
		</div>
	)
}
export default Paginate