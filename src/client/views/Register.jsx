import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, postData } from '../redux/modules/fetchThunk';
import { registerAction, updateRI } from '../redux/modules/authModule';

class Register extends Component {
    register = (e) => {
        e.preventDefault();
        const { postData, registerAction, auth } = this.props;
        const data = auth.register;
        postData('/auth/reg', 'POST', data, registerAction); 
    }
    handleChange = (e) => {
        const { updateRI } = this.props;
        updateRI(e.target.name, e.target.value);
    }
    registerForm = () => {
        let { auth } = this.props;
        return (
            <form className='auth' onSubmit={this.register}>
                <h2> Register </h2>
                <input type='text' name='email' placeholder='email'
                    value={auth.register.email}  
                    onChange={this.handleChange}/>
                <input type='text' name='username' placeholder='username'
                    value={auth.register.username}  
                    onChange={this.handleChange}/>
                <input type='password' name='password' placeholder='password'
                    value={auth.register.password}  
                    onChange={this.handleChange}/>
                <input type='submit' value='Register'/>
            </form>
        )
    }
    render() {
        let { auth, updateRI } = this.props;
        return (
            <Fragment>
            {auth.status.err ? 
                <h3 className='err'> {auth.status.err}</h3>
                : null }
            {auth.status.success ? 
                <h3 className='success'> {auth.status.success}</h3>
                : null }
            {auth.status.user? <p> You have registered already</p> 
                : this.registerForm() }
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
        registerAction: (status) => dispatch(registerAction(status)),
        updateRI: (value,data) => dispatch(updateRI(value,data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
