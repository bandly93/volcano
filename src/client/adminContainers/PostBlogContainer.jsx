import React,{Component} from 'react';
import {AtomicBlockUtils, 
        Editor, 
        EditorState, 
        RichUtils,
        convertToRaw} from 'draft-js';
import { connect } from 'react-redux';
import {updateOne,
        updateImage,
        updateYT,
        postStatus} from '../redux/modules/oneEditorModule';
import RichEditor from '../adminComp/RichEditor.jsx';
import BlockStyleControls from '../adminComp/BlockStyleControls.jsx';
import InlineStyleControls from '../adminComp/InlineStyleControls.jsx';
import TextInput from '../adminComp/TextInput.jsx';
import {postData} from '../redux/modules/fetchThunk';



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
    postData=()=>{
        const {oneEditor,postData,postStatus} = this.props;
        const {editor} = oneEditor;

        var contentState = editor.getCurrentContent();
        var data = {editor:JSON.stringify(convertToRaw(contentState))};
        postData('/editor','POST',data,postStatus);
    }
    render() {
    const {editor, youtube, imgURL, status} = this.props.oneEditor;
    const blog = {_id:0};
        return (
            <div className='dash-container'>
            {status? <h3 className='success'>Blog Posted!</h3>:null}
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
                    <div className='editorButton'>
                        <button onClick={this.postData}>
                            Post</button>   
                    </div>
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
        updateYT:(id,input)=>dispatch(updateYT(id,input)),
		postData:(url,meth,data,func)=>dispatch(postData(url,meth,data,func)),
        postStatus:(status)=>dispatch(postStatus(status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlogContainer);
