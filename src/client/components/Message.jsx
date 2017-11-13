import React,{Component} from 'react';


class Message extends Component{
	
	render(){
	const msg = this.props.msg;	
		return(

			<div className='message'>
				<button className='close' onClick={()=>this.props.delete(msg)}>X</button>
				<p>From: {msg.name} </p>
                <p>Email: {msg.email}</p>
				<hr/>
				<p>Message: {msg.message}</p>
			</div>
		)
	}	
}

export default Message;  
