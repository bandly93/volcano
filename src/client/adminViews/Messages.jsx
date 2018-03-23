import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {allMsgAct} from '../redux/modules/allMsgModule';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';


class Messages extends Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
        this.allMsgID = this.allMsgID.bind(this);
	}
	componentDidMount(){
//        console.log('will get data');
  //      console.log(`/api/msg/data/${location.search}`);
        this.props.fetchData(`/api/msg/data/${location.search}`,
            this.props.allMsgAct)
		//this.props.fetchData('/msg',this.props.allMsgAct)
	}

    componentWillReceiveProps(nextProps){
        if(nextProps.location.search !== this.props.location.search){
          //  console.log('will mount',nextProps.match.path,
          //  nextProps.location.search);               
            this.props.fetchData(`/api/msg/data/${nextProps.location.search}`,
                this.props.allMsgAct)
        }  
    }

	allMsgID(){
        if(this.props.allMsg.data[0]){
            let obj ={};
            let allMsg = this.props.allMsg.data;
            obj.new = allMsg[0]._id;
            obj.old = allMsg[allMsg.length-1]._id;
            return obj;
        }
        else{
            return {};
        }
	}
	delete(msg){
		const id = msg._id
		this.props.postData('/api/msg','DELETE',{_id:id},this.props.allMsgAct)
	}
	list(){
		return this.props.allMsg.data.map(msg=>
			<Message key={msg._id} msg={msg} delete={this.delete}/>
		)
	}
	render(){
    //console.log(this.props.allMsg.page,this.props.match.path,this.allMsgID)
		return(
			<div className='dash-container'>
				{this.props.allMsg.data? this.list():null}

   				{this.props.allMsg.data?
                <Paginate page = {this.props.allMsg.page}
                path = {this.props.match.path}
                modelID={this.allMsgID}/> 
                :null}
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

