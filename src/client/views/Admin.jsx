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
	}
	handleChange=(event)=>{
		this.setState({[event.target.name]:event.target.value})
	}
	userData(user,pass){
		return {
			username:user,
			password:pass
		}
	}
	componentDidMount(){
		this.props.fetchData('/auth/log',this.props.adminAct)
	}
    componentWillReceiveProps(nextProps){
        if(nextProps.admin.redirect !== this.props.admin.redirect) {
            nextProps.admin.redirect == true? this.goHome() : null;
            
        }
    }
    register=(e)=>{
        const {regUsername, regPassword} = this.state;
        e.preventDefault();
        this.props.postData('/auth/reg','POST',
            this.userData(regUsername,regPassword),
            this.props.adminAct);
            this.setState({
                regUsername:'',
                regPassword:''
            })
    }
    login=(e)=>{
        const {logUsername,logPassword} = this.state;
        e.preventDefault();
        this.props.postData('/auth/log','POST',
            this.userData(logUsername, logPassword),this.props.adminAct);
            this.setState({
                logUsername:'',
                logPassword:''
            })
    }
    logout=()=>{
        this.props.fetchData('/auth/logout',this.props.adminAct)
    }
	regLog(){
        const {regUsername,regPassword,logUsername,logPassword} = this.state;
        console.log(this.props);
		return(
			<div className = 'reglog'>
                <form onSubmit={this.register} className='reglogChild'>
                    <h2>Register</h2>
                    <input type='text' name='regUsername' 
                    onChange={this.handleChange}
                    placeholder='username' value={regUsername}/> 
                    <br/>
                    <input type='password' name='regPassword' 
                    onChange={this.handleChange}
                    placeholder='password' value={regPassword}/> 
                    <br/>
                    <input className='submit' type='submit' value='Register'/>
                </form>
                <form onSubmit={this.login} className='reglogChild'>
                    <h2>Login</h2>
                    <input type='text' name='logUsername' 
                    onChange={this.handleChange}
                    placeholder='username' value={logUsername}/> 
                    <br/>
                    <input type='password' name='logPassword' 
                    onChange={this.handleChange}
                    placeholder='password' value={logPassword}/> 
                    <br/>
                    <input className='submit' type='submit' value='Login'/>
                </form>
			</div>
		)
	}
	logoutButton(){
		return(
            <form >
                <input type='button' value='Logout' onClick={this.logout}/>
            </form>
		)
	}
    goHome(){
        this.props.history.push('/dashboard');
        location.reload();
    }
	render(){
    const {admin} = this.props;
		return(		
			<div>
			{admin.err?
                <h3 className='err'>{admin.err}</h3>
                :null}
			{admin.success?
                <h3 className='success'>{admin.success}</h3>
                :null}
			{admin.user?this.logoutButton():this.regLog()}
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
		postData:(url,method,data,actFunc)=>
                dispatch(postData(url,method,data,actFunc)),
		adminAct:(admin)=>dispatch(adminAct(admin))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);


