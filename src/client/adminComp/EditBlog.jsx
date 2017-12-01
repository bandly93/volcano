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
    const {blog,remove,update,put} = this.props;
    //console.log(put);
        return(
            <div className='editBlog'>
                <button className='close' onClick={()=>remove(blog)}>X</button>
                <div className='blog'>
                <Editor
                    editorState={blog.editor}
                    onChange={this.update}
                />
                <button className='save' onClick={()=>put(blog)}>Save</button>
                </div>
            </div>
        )
    }
	
}
export default EditBlog
