import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ClientRouter from '../components/ClientRouter.jsx';
import {Provider, connect} from 'react-redux';
import configureStore from '../redux/store';
import {viewAct} from '../redux/modules/viewModule';


class Index extends Component{
    componentDidMount(){
        const {getScreenSize} = this.props;
        window.addEventListener('resize',()=>getScreenSize(window.innerWidth));
    }
	render(){
    //console.log(window.innerWidth); 
		return(
			<div className='react'>
				<ClientRouter />
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
    return{
        display:state.display        
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getScreenSize:(display) => dispatch(viewAct(display))
    }
};

const Home =  connect(mapStateToProps,mapDispatchToProps)(Index)

const store = configureStore();

ReactDOM.render(
	<Provider store = {store}>
		<Home />
	</Provider>,
document.getElementById('index'))



