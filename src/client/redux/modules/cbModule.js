
//action
export function cbAct(cb){
	return{
		type:'CB',
		cb
	}
}

//reducer
export const cb =(state={},action)=>{
	switch(action.type){
		case 'CB':
			return {
                db:action.cb
            } 
		default:
			return state;
	}
}

export default cb;
