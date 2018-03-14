import React,{Component} from 'react';
import { connect } from 'react-redux';
import {postData} from '../redux/modules/fetchThunk';
import {msgAct} from '../redux/modules/msgModule';


class ContactForm extends Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			message:''
		}
		this.sendMsg = this.sendMsg.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	msg(){
		return {
			name:this.state.name,
			email:this.state.email,
			message:this.state.message
		}
	}
	reset(){
		this.setState({
			name:'',
			email:'',
			message:''
		})
	}
	sendMsg(e){
		e.preventDefault();
		//console.log(this.props)
		this.props.postData('/msg','POST',this.msg(),this.props.msgAct);
		this.reset();
	}
	render(){
		return(
				<form className='contact-form' onSubmit={this.sendMsg}>
					<input type='text' name='name' placeholder='Name' 
					value={this.state.name}
					onChange={this.handleChange}/>
					<br/>
					<input type='email' name='email' placeholder='Email' 
					value={this.state.email}
					onChange={this.handleChange}/>
					<br/>
					<textarea rows='10' name='message'placeholder='Message'
					value={this.state.message}
					onChange={this.handleChange}></textarea>
					<br/>
					<input type='submit' name='Submit' className='submit'/>
				</form>
		)
	}	
}
const mapStateToProps = (state) =>{
	return{
		msg:state.msg
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		msgAct:(msg)=>dispatch(msgAct(msg))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactForm);

