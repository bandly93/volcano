import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar.jsx';

class Index extends Component{
	render(){
		return(
			<div>
				<NavBar />
			</div>
		)
	}
}

ReactDOM.render(<Index />,document.getElementById('index'));
