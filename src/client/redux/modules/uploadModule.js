export function uploadAct(upload){
	return{
		type:'UPLOAD',
		upload
	}
}


//reducer
export const upload = (state = initialState,action)=>{
	switch(action.type){
		case 'UPLOAD':
			return action.upload
		default:
			return state;
	}
}


let initialState = {
	folders:[],
	images:[{ 
			name : "yee",
			path:"../images/uploads/Creative/first.jpeg"
		  }],
	folderName:'',
	firstImages:[]
}

export default upload;
