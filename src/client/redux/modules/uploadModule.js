export function uploadAct(upload){
	return{
		type:'UPLOAD',
		upload
	}
}

export function getAllPhotos(dir){
	return {
		type:'GET_ALL_PHOTOS'
	}
}

//reducer
export const upload = (state = {},action)=>{
	switch(action.type){
		case 'UPLOAD':
			return action.upload
		case 'GET_ALL_PHOTOS'
			return action
		default:
			return state;
	}
}

export default upload;
