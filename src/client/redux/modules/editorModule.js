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
                convertFromRaw(JSON.parse(blog.editor)))

        })
    )
}


export default editor;
