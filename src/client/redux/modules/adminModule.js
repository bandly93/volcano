//action
export function adminAct(admin){
	return{
		type:'ADMIN',
		admin
	}
}

//reducer
export const admin =(state={},action)=>{
	switch(action.type){
		case 'ADMIN':
			return action.admin || {}; 
		default:
			return state;
	}
}

export default admin;
