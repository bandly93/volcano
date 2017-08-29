//action
export function instaPosts(insta){
	return{
		type:'INSTA',
		insta
	}
}

//reducer
export const insta =(state=[],action)=>{
	switch(action.type){
		case 'INSTA':
			return action.insta 
		default:
			return state;
	}
}

export default insta;