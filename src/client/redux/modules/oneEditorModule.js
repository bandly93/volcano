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

// initial state
let initialState = {
    editor: EditorState.createEmpty()
}

// reducer 
export const oneEditor = (state = initialState, action) => {
    const {editor} = action;
    switch (action.type) {
        case 'UPDATE_ONE':    
            return {
               editor 
            }
        default:
            return state;
    }
}

export default oneEditor;
