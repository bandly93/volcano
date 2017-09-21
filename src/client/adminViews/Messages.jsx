import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {allMsgAct} from '../redux/modules/allMsgModule';
import Message from '../components/Message.jsx';

class Messages extends Component{
	componentDidMount(){
		this.props.fetchData('/msg',this.props.allMsgAct)
	}
	list(){
		return this.props.allMsg.map(msg=>{
			return <Message key={msg._id} msg={msg}/>
		})
	}
	render(){
		return(
			<div className='msg-container'>
				{this.props.allMsg[0]? this.list():null}
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

