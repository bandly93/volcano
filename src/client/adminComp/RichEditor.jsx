import React,{Component} from 'react';
import { connect } from 'react-redux';
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

class RichEditor extends Component{
    focus = () => this.refs.editor.focus();
    handleKey=(command,editorState)=>{
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.props.onChange(newState);
            return true;
        }
    }
    onTab =(e)=>{
        const maxDepth = 4;
        const {blog} = this.props;
        this.update(RichUtils.onTab(e,blog.editor,maxDepth));
    }
    render() {
    let className = 'RichEditor-editor';
    const {editor,onChange} = this.props;
        return(
            <div className={className} onClick={this.focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                    customStyleMap={styleMap}
                    editorState = {editor}
                    onChange={onChange}
                    handleKeyCommand={this.handleKey}
                    ref='editor'
                    spellCheck={true}
                    onTab={this.onTab}
                />
            </div>
        )
    }
}




export default RichEditor;
