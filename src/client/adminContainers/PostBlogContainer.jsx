import React,{Component} from 'react';
import {AtomicBlockUtils, 
        Editor, 
        EditorState, 
        RichUtils} from 'draft-js';
import { connect } from 'react-redux';
import {updateOne,
        updateImage,
        updateYT} from '../redux/modules/oneEditorModule';
import RichEditor from '../adminComp/RichEditor.jsx';
import BlockStyleControls from '../adminComp/BlockStyleControls.jsx';
import InlineStyleControls from '../adminComp/InlineStyleControls.jsx';
import TextInput from '../adminComp/TextInput.jsx';



class PostBlogContainer extends Component {
    toggleBlockType=(blockType)=> {
      this.props.updateOne(
        RichUtils.toggleBlockType(
          this.props.oneEditor.editor,
          blockType
        )
      );
    }
    toggleInlineStyle=(inlineStyle)=>{
      this.props.updateOne(
        RichUtils.toggleInlineStyle(
          this.props.oneEditor.editor,
          inlineStyle
        )
      );
    }
    confirmMedia=(type,content)=>{
        const {editor} = this.props.oneEditor;
//        console.log('confirm!',type,content);
        const contentState = editor.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            type,
            'IMMUTABLE',
            {src: content}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editor,
            {currentContent: contentStateWithEntity}
            );
        const newReduxState = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
        )    
        this.props.updateOne(newReduxState);
    }
    addImage=(blog)=>{
        const content = this.props.oneEditor.imgURL;
        this.confirmMedia('image',content);
    }
    addYouTube=(blog)=>{
        const youtube = this.props.oneEditor.youtube;
        const vidURL = 'https://www.youtube.com/embed/' 
                + youtube.split('com\/watch?v=')[1];
        const check = vidURL.split('&');
        console.log(check);
        this.confirmMedia('youtube',check[0]);
    }
    render() {
    const {editor, youtube, imgURL} = this.props.oneEditor;
    console.log(youtube, imgURL);
    const blog = {_id:0};
        return (
            <div className='dash-container'>
                <div className='RichEditor-root'>
                <BlockStyleControls editorState={editor}
                    onToggle={this.toggleBlockType}/>
                <InlineStyleControls editorState={editor}
                    onToggle={this.toggleInlineStyle}/>
                <TextInput 
                    updateInput ={this.props.updateImage}
                    inputValue ={imgURL}
                    data ={blog}
                    onSubmit={this.addImage}
                    buttonText='Add Image'
                    />
                <TextInput
                    updateInput ={this.props.updateYT}
                    inputValue ={youtube}
                    data ={blog}
                    onSubmit={this.addYouTube}
                    buttonText='Add Video'
                    />
                    <RichEditor
                        editor = {editor}
                        onChange = {this.props.updateOne}  
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {oneEditor} = state;
    return {
        oneEditor
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateOne: (editor) => dispatch(updateOne(editor)),
        updateImage:(id,input)=>dispatch(updateImage(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlogContainer);
