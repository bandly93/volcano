
let initialState = {
	modalProps:null,
	modalType:null,
}

export const MODAL_DATA = "MODAL_DATA";

export const modalAct = (data) => {
	return{
		type:MODAL_DATA,
		data
	}
}


export const modalReducer = (state = initialState,action) =>{
	switch(action.type){
		case MODAL_DATA:
			return{...state,...action.data}
		default:
			return state
	}
}

export default modalReducer;
