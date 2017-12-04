import React,{Component} from 'react';
import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';


class EditBlog extends Component{
    update=(editorState)=>{
        const {blog,update} = this.props;
        update(blog._id,editorState);
    }
    handleKey=(command,editorState)=>{
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.update(newState);
            return true;
        }
    }
    onTab =(e)=>{
        const maxDepth = 4;
        const {blog} = this.props;
        this.update(RichUtils.onTab(e,blog.editor,maxDepth));
    }

    render(){
    const {blog,remove,update,put} = this.props;
    //console.log(put);
        return(
            <div className='editBlog'>
                <button className='close' onClick={()=>remove(blog)}>X</button>
                <div className='blog'>
                <Editor
                    editorState={blog.editor}
                    onChange={this.update}
                    handleKeyCommand={this.handleKey}
                    ref='editor'
                    spellCheck={true}
                    onTab={this.onTab}
                />
                <button className='save' onClick={()=>put(blog)}>Save</button>
                </div>
            </div>
        )
    }
	
}
export default EditBlog
