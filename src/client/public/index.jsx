import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar.jsx';
import TopBanner from '../components/TopBanner.jsx';

class Index extends Component{
	render(){
		return(
			<div>
				<TopBanner />
				<NavBar />
			</div>
		)
	}
}

ReactDOM.render(<Index />,document.getElementById('index'));
