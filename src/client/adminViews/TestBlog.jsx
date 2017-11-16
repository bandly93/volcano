import React,{Component} from 'react';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import BlockStyleControls from '../adminComp/BlockStyleControls.jsx';
import InlineStyleControls from '../adminComp/InlineStyleControls.jsx';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';
import {styleMap,getBlockStyle} from '../adminComp/editorStyle.js';
import {editorAct,postStatus} from '../redux/modules/editorModule';



class MyEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.postData = this.postData.bind(this);
    }
    _handleKeyCommand(command, editorState){
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.onChange(newState);
            return true;
        }
    }
    _onTab(e) {
      const maxDepth = 4;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }
    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
    postData(){
        const {editorState} = this.state;
        const {editorAct,postStatus} = this.props;
        var contentState = editorState.getCurrentContent();
        var data = {editor:JSON.stringify(convertToRaw(contentState))};
        
        this.props.postData('/editor','POST',data,postStatus);
        this.setState({
            editorState: EditorState.createEmpty()
        });
    }
    render(){
        const {editorState} = this.state;
        const {editor} = this.props;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
        }
        return(
            <div>
            {editor.status? <h3 className='success'>Blog Posted!</h3>:null}
                <div className='RichEditor-root'>
                    <BlockStyleControls editorState={editorState}
                        onToggle={this.toggleBlockType}/>
                    <InlineStyleControls editorState={editorState}
                        onToggle={this.toggleInlineStyle}/>
                    <div className={className} onClick={this.focus}>
                        <Editor 
                             blockStyleFn={getBlockStyle}
                             customStyleMap={styleMap}
                             editorState={editorState}
                             onChange={this.onChange}
                             handleKeyCommand={this.handleKeyCommand}    
                             ref="editor"
                             onTab={this.onTab}
                             spellCheck={true}
                         />
                    </div>
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
    return{
		editor:state.editor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		editorAct:(editor)=>dispatch(editorAct(editor)),	
		postData:(url,method,data,actFunc)=>dispatch(postData(url,method,data,actFunc)),
        postStatus:(status)=>dispatch(postStatus(status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyEditor);
