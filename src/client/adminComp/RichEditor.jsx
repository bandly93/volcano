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


    render() {
    let className = 'RichEditor-editor';
    const {editor,onChange} = this.props;
        return(
            <div className='RichEditor-root'>

                <div className={className} onClick={this.focus}>
                    <Editor
                        editorState = {editor}
                        onChange={onChange}
                        handleKeyCommand={this.handleKey}
                        blockStyleFn={getBlockStyle}
                        blockRendererFn={mediaBlockRenderer}
                        customStyleMap={styleMap}
                        ref='editor'
                        spellCheck={true}
                    />
                </div>
    
            </div>
        )
    }
}




export default RichEditor;
