import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar.jsx';
import TopBanner from '../components/TopBanner.jsx';
import Landing from '../views/Landing.jsx';
import {Provider} from 'react-redux';
import configureStore from '../redux/store';


class Index extends Component{
	render(){
		return(
			<div>
				<Landing />
			</div>
		)
	}
}

const store = configureStore();

ReactDOM.render(
	<Provider store = {store}>
		<Index />
	</Provider>,
document.getElementById('index'))
