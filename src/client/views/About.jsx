import React,{Component} from 'react';
import { fetchData } from '../redux/modules/fetchThunk';
import { flickrAct } from '../redux/modules/flickrModule';
import { connect } from 'react-redux';
import ContactForm from '../components/ContactForm.jsx';
import PdImg from '../public/images/about/pd.png';
import XinhImg from '../public/images/about/xinh.png';


const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					
class About extends Component{
	list(){
		return(			
			<div className = "about">
				<span>
					<img src = {`/${PdImg}`}/>
					<p>
						Phuong Dang more commonly known as PD (Pee-dee) is an Oakland-based creative –– specializing in photography + videography. PD loves embracing natural ambience of any settings to create moods in which, he portrays in his beautiful photographs he creates. PD’s work is vibrant, detailed oriented, and right to the point! His impressive personification and distinct use of his surroundings has his audience on edge. His creative style + ideas has allow him to work with a variety of different clients of every age and class. 

There’s lots planned for Volcano Boyz (VB) Production’s future, including merchandise as well as a series of lifestyle videos: always with the goal of sharing the very best photography, art & visual culture in an accessible way.


					</p>
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


