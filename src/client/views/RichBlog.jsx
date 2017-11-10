import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import Paginate from '../components/Paginate.jsx';
import {editorAct} from '../redux/modules/editorModule';
import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';


class RichBlog extends Component{
    componentDidMount(){
        const {fetchData,editorAct} = this.props;
        fetchData(`/editor/data/${location.search}`,editorAct)
    }
    componentWillReceiveProps(nextProps){
        const {fetchData,editorAct,location} = this.props;
        if(nextProps.location.search !== location.search){
            fetchData(`/editor/data/${nextProps.location.search}`,
                editorAct)
        }  
    }
    list(){
        const {data} = this.props.editor;
        return data.map(e => 
            <div key = {e._id} className='RichEditor-root'>
                <Editor
                    editorState={
                        EditorState.createWithContent(convertFromRaw(
                            JSON.parse(e.editor)))
                    }
                    readOnly={true}
                />
            </div>
        )
    }
	blogID=()=>{
        const {data} = this.props.editor;
        if(data){
            let obj ={};
            let blog = data;
            obj.new = blog[0]._id;
            obj.old = blog[blog.length-1]._id;
            return obj;
        }
        else{
            return {};
        }
	}
    render(){
    const {data,page} = this.props.editor;
        return(
            <div>
                Hello RichBlog!
                {data?this.list():null}         
                {data? 
                <Paginate page = {page}
                path = {this.props.match.path}
                modelID={this.blogID}/> 
                :null}
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
	return{
		editor:state.editor
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>
            dispatch(postData(url,method,data,actFunc)),
		editorAct:(editor)=>dispatch(editorAct(editor))	
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(RichBlog);
