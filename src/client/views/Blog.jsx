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
import {styleMap,
        getBlockStyle,
        mediaBlockRenderer} from '../adminComp/editorStyle.js';

class RichBlog extends Component{
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
        let className = 'RichEditor-editor';
        const {converted} = this.props.editor;
        return converted.map(e => 
            <div key = {e._id} className='RichEditor-root'>
                <div className={className}>
                <Editor
                    editorState={e.editor}
                    blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                    customStyleMap={styleMap}
                    readOnly={true}
                />
                </div>
            </div>
        )
    }
	blogID=()=>{
        const {data} = this.props.editor.db;
        if(data[0]){
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
    const {path} = this.props.match;
    const {converted, db} = this.props.editor;
        return(
            <div className='mainBlogs'>
                Hello RichBlog!
                {converted?this.list():null}         
                {converted? <Paginate page = {db.page} path = {path} 
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
