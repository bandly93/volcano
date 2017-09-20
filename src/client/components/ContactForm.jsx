import React,{Component} from 'react';

function ContactForm(){
	return(
		<div>
			<form>
				<label>Name</label>
				<input type='text' name='firstName' placeholder='First'/>
				<input type='text' placeholder='Last'/>
				<br/>
				<label>Email Address</label>
				<input type='email' />
				<br/>
				<label>Message</label>
				<input type='textarea' />
				<br/>
				<input type='submit' name='Submit' />
			</form>
		</div>
	)

	
}
export default ContactForm

