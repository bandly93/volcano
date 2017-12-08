import React,{Component} from 'react';
import {Editor, 
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


class EditBlog extends Component{
    focus = () => this.refs.editor.focus();
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
    toggleBlockType=(blockType)=> {
      this.update(
        RichUtils.toggleBlockType(
          this.props.blog.editor,
          blockType
        )
      );
    }
    toggleInlineStyle=(inlineStyle)=>{
      this.update(
        RichUtils.toggleInlineStyle(
          this.props.blog.editor,
          inlineStyle
        )
      );
    }
    closeButton=()=>{
        const {blog,remove} = this.props;
        return(
            <div className='putLeft'>
                <button className='close' onClick={()=>remove(blog)}>X</button>
            </div>
        )
    }
    saveButton=()=>{
        const {blog,put} = this.props;
        return(
            <div className='editorButton'>
                <button className='save' onClick={()=>put(blog)}>Save</button>
            </div>
        )
    }
    render(){
    let className = 'RichEditor-editor';
    const {blog,remove,update,put,updateInput,inputValue} = this.props;
    //console.log(put);
        return(
            <div className='RichEditor-root'>
                {this.closeButton()}
                <BlockStyleControls editorState={blog.editor}
                    onToggle={this.toggleBlockType}/>
                <InlineStyleControls editorState={blog.editor}
                    onToggle={this.toggleInlineStyle}/>
                <TextInput 
                    updateInput ={updateInput}
                    inputValue ={inputValue}
                    />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        blockRendererFn={mediaBlockRenderer}
                        customStyleMap={styleMap}
                        editorState={blog.editor}
                        onChange={this.update}
                        handleKeyCommand={this.handleKey}
                        ref='editor'
                        spellCheck={true}
                        onTab={this.onTab}
                    />
                </div>
                {this.saveButton()}
            </div>
        )
    }
	
}
export default EditBlog
