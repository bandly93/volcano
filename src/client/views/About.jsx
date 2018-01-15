import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';
import ContactForm from '../components/ContactForm.jsx';
import PdImg from '../public/images/about/pd.jpg';
import XinhImg from '../public/images/about/xinh.jpg';


const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					
class About extends Component{
	list(){
		return(			
			<div className = "about">
				<span>
					<img src = {`/${PdImg}`}/>
					<p>{lorem_ipsum}</p>
				</span>
				<span>
					<img src = {`/${XinhImg}`}/>
					<p>{lorem_ipsum}</p>
				</span>
			</div>
		)
	}
	success(){
		return(
			<p className='success'>message successfully sent!</p>
		)
	}
	error(){
		return(
			<p className='err'>there was an error</p>
		)
	}
	render(){	
		return (
			<div>
				{this.list()}
				{this.props.msg.msg? this.success():null}
				{this.props.msg.err? this.error():null}
				<ContactForm />
			</div>
		)	
		
	}
}

const mapStateToProps = (state) =>{
	return{
		flickr:state.flickr,
		msg:state.msg
	}
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		flickrAct:(flickr)=>dispatch(flickrAct(flickr))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(About);


