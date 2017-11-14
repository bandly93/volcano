import React,{Component} from 'react';
import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';


function EditBlog({blog,remove}){
	return(
		<div>
			<button className='close' 
                onClick={()=>remove(blog)}>X</button>
                <Editor
                    editorState={
                        EditorState.createWithContent(convertFromRaw(
                            JSON.parse(blog.editor)))
                    }
                    readOnly={true}
                />
		</div>
	)

	
}
export default EditBlog
