import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';

// action
export function updateOne(editor) {
    return {
        type: 'UPDATE_ONE',
        editor
    }
}   
export function updateImage(id,input) {
    return {
        type: 'UPDATE_ONE_IMAGE',
        input
    }
}

export function updateYT(id,input) {
    return {
        type: 'UPDATE_ONE_YT',
        input
    }
}
export function postStatus(status){
    console.log(status);
    return{
        type: 'ONE_STATUS',
        status
    }
}

// initial state
let initialState = {
    editor: EditorState.createEmpty(),
    imgURL: "",
    youtube:""
}

// reducer 
export const oneEditor = (state = initialState, action) => {
    const {editor, status} = action;
    switch (action.type) {
        case 'UPDATE_ONE':    
            return {
                ...state,
                editor 
            }
        case 'UPDATE_ONE_IMAGE':
            return {
                ...state,
                imgURL: action.input
            }
        case 'UPDATE_ONE_YT':
            return {
                ...state,
                youtube: action.input
            }
        case 'ONE_STATUS':
            return{
                ...state,
                status
                }
        default:
            return state;
    }
}







export default oneEditor;
