//action
export function msgAct(msg){
	return{
		type:'MSG',
		msg
	}
}

//reducer
export const msg =(state={},action)=>{
	switch(action.type){
		case 'MSG':
			return action.msg 
		default:
			return state;
	}
}

export default msg;