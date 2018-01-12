import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ClientRouter from '../components/ClientRouter.jsx';
import {Provider, connect} from 'react-redux';
import configureStore from '../redux/store';
import {viewAct} from '../redux/modules/viewModule';
import {fetchData} from '../redux/modules/fetchThunk';
import {adminAct} from '../redux/modules/adminModule';


class Index extends Component{
    componentDidMount(){
        const {getScreenSize} = this.props;
        window.addEventListener('resize',()=>getScreenSize(window.innerWidth));
		this.props.fetchData('/auth/log',this.props.adminAct)
    }
	render(){
    //console.log(window.innerWidth); 
    const {user} = this.props.admin;
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
        admin: state.admin
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display)),
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		adminAct:(admin)=>dispatch(adminAct(admin))
    }
};

const Home =  connect(mapStateToProps,mapDispatchToProps)(Index)

const store = configureStore();

ReactDOM.render(
	<Provider store = {store}>
		<Home />
	</Provider>,
document.getElementById('index'))



