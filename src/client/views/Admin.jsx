import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {adminAct} from '../redux/modules/adminModule';


class Admin extends Component{
	constructor(props){
		super(props);
		this.state={
			regUsername:'',
			regPassword:'',
			logUsername:'',
			logPassword:''
		}
		this.handleChange = this.handleChange.bind(this);
		//this.resetData = this.resetData.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	userData(user,pass){
		let userData ={
			username:user,
			password:pass
		}
		return userData;
	}
	test(data){
		console.log(data)
	}
	componentDidMount(){
		this.props.fetchData('/auth/log',this.props.adminAct)
	}
	regLog(){
		return(
			<div className = 'reglog'>
				<span className='reglogChild'>
					<h2>Register</h2>
					<form onSubmit={(e)=>{
						e.preventDefault();this.props.postData(
							'/auth/reg','POST',
							this.userData(
								this.state.regUsername,
								this.state.regPassword),
							this.props.adminAct);
							this.setState({
								regUsername:'',
								regPassword:''
							})
							}}>
						<input type='text' name='regUsername' 
						onChange={this.handleChange}
						placeholder='username' value={this.state.regUsername}/> 
						<br/>
						<input type='password' name='regPassword' 
						onChange={this.handleChange}
						placeholder='password' value={this.state.regPassword}/> 
						<br/>
						<input className='buttons' type='submit' value='Register'/>
					</form>
				</span>
				<span className = 'reglogChild'>
					<h2>Login</h2>
						<form onSubmit={(e)=>{
						e.preventDefault();this.props.postData(
							'/auth/log','POST',
							this.userData(
								this.state.logUsername,
								this.state.logPassword),
							this.props.adminAct);
							this.setState({
								logUsername:'',
								logPassword:''
							})
							}}>
						<input type='text' name='logUsername' 
						onChange={this.handleChange}
						placeholder='username' value={this.state.logUsername}/> 
						<br/>
						<input type='password' name='logPassword' 
						onChange={this.handleChange}
						placeholder='password' value={this.state.logPassword}/> 
						<br/>
						<input className='buttons' type='submit' value='Login'/>
					</form>
				</span>
			</div>
		)
	}
	logout(){
		return(
			<div>
				<form >
					<input type='button' value='Logout' onClick={()=>this.props.fetchData('/auth/logout',this.props.adminAct)}/>
				</form>
			</div>
		)
	}
	render(){
		return(		
			<div>
			{this.props.admin.user?this.logout():this.regLog()}
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
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		adminAct:(admin)=>dispatch(adminAct(admin))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);

