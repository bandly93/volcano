import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';

//action
export function editorAct(editor){
	return{
		type:'EDITOR',
		editor
	}
}
export function postStatus(status){
    return{
        type: 'STATUS',
        status
    }
}
/////// editor action ////////////////
export function updateEditor(id,editorState){
    return{
        type:'UPDATE',
        id,
        editorState       
    }
}
export function handleKeyCommand(id){
    return{
        type:'HANDLE_KEY',
        id,
    }
}
//////////////////////////////////////

//reducer
export const editor =(state={},action)=>{
    const {editor,status} = action;
	switch(action.type){
		case 'EDITOR':
			return {
                ...state,
                db: editor,
                converted: editor.data?convert(editor.data):null
                }
        case 'STATUS':
            return{
                ...state,
                status
                }
        case 'UPDATE':
            return {
                ...state,
                converted:state.converted.map(blog =>
                (blog._id == action.id)
                    ? {...blog, editor:action.editorState}
                    :blog
                )}
        case 'UPDATE_INPUT':
            return {
                ...state,
                converted:state.converted.map(blog =>
                    (blog._id == action.id)
                        ? {...blog, imgURL:action.input}
                        :blog
                )}
		default:
			return state;
	}
}
//state modifiers
const convert =(data)=>{
    const editorData = [...data];
    return  editorData.map(blog =>
        ({ ...blog,
            editor:EditorState.createWithContent(
                convertFromRaw(JSON.parse(blog.editor))),
            imgURL:'',

        })
    )
}


export default editor;
