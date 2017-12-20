import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../redux/modules/fetchThunk';
import Paginate from '../components/Paginate.jsx';
import {editorAct} from '../redux/modules/editorModule';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';


class BlogContainer extends Component {
    componentDidMount(){
        const {fetchData,editorAct} = this.props;
        fetchData(`/editor/get/data/${location.search}`,editorAct)
    }
    componentWillReceiveProps(nextProps){
        const {fetchData,editorAct,location} = this.props;
        if(nextProps.location.search !== location.search){
            fetchData(`/editor/get/data/${nextProps.location.search}`,
                editorAct)
        }  
    }
    list(){
        const {converted} = this.props.editor;
        return converted.map(e =>
           <this.props.component key={e._id}
            /> 
        )
    }
    render(){
    const {path} = this.props.match;
    const {db,converted} = this.props.editor;
        return(
            <div className='dash-container'>
                <h1> Edit Blogs</h1>
				{converted? this.list():null}
                {converted? <Paginate page = {db.page} path = {path} 
                    modelID={this.blogID}/> 
                    :null}
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
	return{
		editor:state.editor,
        text:state.text,
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>
            dispatch(postData(url,method,data,actFunc)),
		editorAct:(editor)=>dispatch(editorAct(editor)),
        updateEditor:(id,state)=>dispatch(updateEditor(id,state)),	
        postStatus:(status)=>dispatch(postStatus(status)),
        updateInput:(id,input)=>dispatch(updateInput(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(BlogContainer);
