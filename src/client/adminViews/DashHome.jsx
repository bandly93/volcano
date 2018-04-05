import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import { loginAction } from '../redux/modules/authModule';



class DashHome extends Component{
    logout=()=>{
        this.props.fetchData('/auth/logout',this.props.loginAction)
    }
	logoutButton(){
		return(
            <form >
                <input  className= 'teal-button' 
                    type='button' value='Logout' onClick={this.logout}/>
            </form>
		)
	}
    render() {
    const {auth} = this.props;
        return(
            <div className='dash-container'>
                <p className='dashHome'>Hello DashHome!</p>
                {auth.status.user?this.logoutButton():null}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
	return{
        auth: state.authReducer,
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
        loginAction: (status) => dispatch(loginAction(status)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DashHome);
