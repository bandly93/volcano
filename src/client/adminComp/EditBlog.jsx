import React,{Component} from 'react';
import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';


function EditBlog({blog,remove}){
	return(
		<div className='editBlog'>
			<button className='close' onClick={()=>remove(blog)}>X</button>
            <div className='blog'>
            <Editor
                editorState={blog.editor}
                readOnly={true}
            />
            </div>
		</div>
	)

	
}
export default EditBlog
