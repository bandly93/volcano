//action
export function blogAct(blog){
	return{
		type:'BLOG',
		blog
	}
}

//reducer
export const blog =(state=[],action)=>{
	switch(action.type){
		case 'BLOG':
			return action.blog 
		default:
			return state;
	}
}

export default blog;