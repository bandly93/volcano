//action
export function allMsgAct(allMsg){
	return{
		type:'ALLMSG',
		allMsg
	}
}

//reducer
export const allMsg =(state={},action)=>{
	switch(action.type){
		case 'ALLMSG':
			return action.allMsg 
		default:
			return state;
	}
}

export default allMsg;