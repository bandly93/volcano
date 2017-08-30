import React,{Component} from 'react';
import { connect } from 'react-redux';
import {postData} from '../redux/modules/fetchThunk';
import {adminAct} from '../redux/modules/adminModule';


class Admin extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			password:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.resetData = this.resetData.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	userData(){
		let userData ={
			username:this.state.username,
			password:this.state.password
		}
		return userData;
	}
	resetData(){
		let data ={
			username:'',
			password:''
		}
		return data;
	}
	render(){
		return(		
			<div className = 'reglog'>
				<span className='reglogChild'>
					<h2>Register</h2>
					<form onSubmit={(e)=>{
						e.preventDefault();this.props.postData(
							'/admin/reg','POST',this.userData())
							}}>
						<input type='text' name='username' 
						onChange={this.handleChange}
						placeholder='username' value={this.state.username}/> 
						<br/>
						<input type='password' name='password' 
						onChange={this.handleChange}
						placeholder='password' value={this.state.password}/> 
						<br/>
						<input className='buttons' type='submit' value='Register'/>
					</form>
				</span>
				<span className = 'reglogChild'>
					<h2>Login</h2>
					<form >
						<input type='text' name='username' placeholder='username'/> 
						<br/>
						<input type='password' name='password' placeholder='password'/> 
						<br/>
						<input className='buttons' type='submit' value='Login'/>
					</form>
				</span>
			</div>
		)
	}	
}

const mapStateToProps = (state) =>{
	return{
		admin:state.admin
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		adminAct:(admin)=>dispatch(adminAct(admin))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);

