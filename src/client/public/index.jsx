import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ClientRouter from '../components/ClientRouter.jsx';
import {Provider, connect} from 'react-redux';
import configureStore from '../redux/store';
import {viewAct} from '../redux/modules/viewModule';
import {fetchData} from '../redux/modules/fetchThunk';
import { loginAction } from '../redux/modules/authModule';



class Index extends Component{
    componentDidMount(){
        const {getScreenSize} = this.props;
        window.addEventListener('resize',()=>getScreenSize(window.innerWidth));
		this.props.fetchData('/auth/log',this.props.loginAction)
    }
	render(){
    //console.log(window.innerWidth); 
    const {user} = this.props.auth.status;
		return(
			<div className='react'>
				<ClientRouter 
                    loggedIn = {user} 
                />
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
    return{
        display: state.display,
        auth: state.authReducer,
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
        loginAction: (status) => dispatch(loginAction(status)),
    }
};

const Home =  connect(mapStateToProps,mapDispatchToProps)(Index)

const store = configureStore();

ReactDOM.render(
	<Provider store = {store}>
		<Home />
	</Provider>,
document.getElementById('index'))



