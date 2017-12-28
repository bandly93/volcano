import React,{Component} from 'react';
import { connect } from 'react-redux';
import {updateOne} from '../redux/modules/oneEditorModule';
import RichEditor from '../adminComp/RichEditor.jsx';


class PostBlogContainer extends Component {
    render() {
    const {editor} = this.props.oneEditor;
        return (
            <div className='dash-container'>
                <RichEditor
                    editor = {editor}
                    onChange = {this.props.updateOne}  
                />
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
        updateOne: (editor) => dispatch(updateOne(editor))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlogContainer);
