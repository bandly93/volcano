//action
export function editorAct(editor){
	return{
		type:'EDITOR',
		editor
	}
}

//reducer
export const editor =(state={},action)=>{
	switch(action.type){
		case 'EDITOR':
			return action.editor 
		default:
			return state;
	}
}

export default editor;
