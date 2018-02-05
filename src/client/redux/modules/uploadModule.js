export function uploadAct(data){
	
	return{
		type:'UPLOAD',
		data
	}
}


//reducer
export const upload = (state = initialState,action)=>{
	switch(action.type){
		case 'UPLOAD':
			return {...state,...action.data};
		default:
			return state;
	}
}

let initialState = {
	folders:[],
	images:null,
	folderName:null,
	firstImages:[]
}



export default upload;
