import React,{Component} from 'react';


function Message(props){
	//console.log(props)
	const msg = props.msg;
	return(

		<div className='message'>
			<p className='close' onClick={()=>props.delete(msg)}>X</p>
			<p>From: {msg.name}, {msg.email}</p>
			<p>Message: {msg.message}</p>
		</div>
	)
	
}

export default Message;