import React,{Component} from 'react';
import {AtomicBlockUtils,
        Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';
import BlockStyleControls from '../adminComp/BlockStyleControls.jsx';
import InlineStyleControls from '../adminComp/InlineStyleControls.jsx';
import {styleMap,
        getBlockStyle,
        mediaBlockRenderer} from '../adminComp/editorStyle.js';
import TextInput from '../adminComp/TextInput.jsx';


class PostBlog extends Component{





    render() {
        return(
            <div>
            hello world!

    
            </div>
        )
    }
}


export default PostBlog;
