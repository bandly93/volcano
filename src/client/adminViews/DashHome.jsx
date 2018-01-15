import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {adminAct} from '../redux/modules/adminModule';



class DashHome extends Component{
    logout=()=>{
        this.props.fetchData('/auth/logout',this.props.adminAct)
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
    const {admin} = this.props;
        return(
            <div className='dash-container'>
                <p className='dashHome'>Hello DashHome!</p>
                {admin.user?this.logoutButton():null}
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
		adminAct:(admin)=>dispatch(adminAct(admin))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DashHome);
