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
    list(){
        const {data} = this.props.editor;
        return data.map(e => 
            console.log(e)
        )
    }
    render(){
    const {data} = this.props.editor;
        return(
            <div>
                Hello RichBlog!
                {data?this.list():console.log('nothing here')}            
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
