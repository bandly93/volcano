import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {allMsgAct} from '../redux/modules/allMsgModule';
import Message from '../components/Message.jsx';

class Messages extends Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
	}
	componentDidMount(){
		this.props.fetchData('/msg',this.props.allMsgAct)
	}
	delete(msg){
		const id = msg._id
		this.props.postData('/msg','DELETE',{_id:id},this.props.allMsgAct)
	}
	list(){
		return this.props.allMsg.data.map(msg=>
			<Message key={msg._id} msg={msg} delete={this.delete}/>
		)
	}
	render(){
		return(
			<div className='dash-container'>
				{this.props.allMsg.data? this.list():null}
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		allMsg:state.allMsg
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
		allMsgAct:(allMsg)=>dispatch(allMsgAct(allMsg))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Messages)

