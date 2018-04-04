import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, postData } from '../redux/modules/fetchThunk';
import { registerAction, 
         updateLI, loginAction } from '../redux/modules/authModule';


class Login extends Component {
    login = (e) => {
        e.preventDefault();
        const { postData, loginAction, auth } = this.props;
        const data = auth.login;
        postData('/auth/log', 'POST', data, loginAction); 
    }
    handleChange = (e) => {
        const { updateLI } = this.props;
        updateLI(e.target.name, e.target.value);
    }
    loginForm =() => {
    let { auth } = this.props;
        return (
            <form className='auth' onSubmit={this.login} >
                <h2> Login </h2>
                <input type='text' name='username' placeholder='username'
                    value={auth.login.username}  
                    onChange={this.handleChange}/>
                <input type='password' name='password' placeholder='password'
                    value={auth.login.password}  
                    onChange={this.handleChange}/>
                <input type='submit' value='Login'/>
            </form>
        )    
    }
	logoutButton = () =>{
    let { auth } = this.props;
		return(
            <div className='nav-container nav-views'>
                <form >
                    <input  className= 'teal-button' 
                        type='button' value='Logout' onClick={this.logout}/>
                </form>
                <div className='white-space'></div>
                <button className= 'teal-button' onClick={this.goHome}>
                    Go To Dashboard</button>
            </div>
		)
	}
    logout = () => {
        this.props.fetchData('/auth/logout',this.props.loginAction)
    }
    goHome=()=>{
        this.props.history.push('/dashboard');
    }
	componentDidMount(){
		this.props.fetchData('/auth/log',this.props.loginAction)
	}
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.status.redirect !== this.props.auth.status.redirect) {
            nextProps.auth.status.redirect == true? this.goHome() : null;
            
        }
    }
    render() {
    let { auth } = this.props;
        return (
            <Fragment>
            {auth.status.err ? 
                <h3 className='err'> {auth.status.err}</h3>
                : null }
            {auth.status.success ? 
                <h3 className='success'> {auth.status.success}</h3>
                : null }
            {auth.status.user? this.logoutButton(): this.loginForm()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, cb) => dispatch(fetchData(url, cb)),
        postData: (url, method, data, cb) => dispatch(postData(url, method,
            data, cb)),
        loginAction: (status) => dispatch(loginAction(status)),
        updateLI: (value,data) => dispatch(updateLI(value,data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
