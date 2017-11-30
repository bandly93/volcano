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
    render(){
    const {blog,remove,update} = this.props;
        return(
            <div className='editBlog'>
                <button className='close' onClick={()=>remove(blog)}>X</button>
                <div className='blog'>
                <Editor
                    editorState={blog.editor}
                    onChange={this.update}
                />
                </div>
            </div>
        )
    }
	
}
export default EditBlog
