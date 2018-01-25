export function uploadAct(upload){
	return{
		type:'UPLOAD',
		upload
	}
}


//reducer
export const upload = (state = [],action)=>{
	switch(action.type){
		case 'UPLOAD':
			return action.upload
		default:
			return state;
	}
}

export default upload;
