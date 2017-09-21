import React,{Component} from 'react';

function Message({msg}){
	//console.log(msg)
	return(
		<div className='message'>
			<p>{msg.name}</p>
			<p>{msg.email}</p>
			<p>{msg.message}</p>
		</div>
	)

	
}
export default Message

