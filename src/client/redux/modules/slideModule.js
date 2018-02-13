let initialState = { 
	index:0
}


export const GRAB_INDEX = 'GRAB_INDEX';
export const UPDATE_INDEX = 'UPDATE_INDEX';


export const grabIndex = (data) => {
	return {
		type:GRAB_INDEX,
		data
	}
}

export const updateIndex = (data) => {
	return {
		type:UPDATE_INDEX,
		data
	}
}

export const slideReducer = (state = initialState,action) => {
	switch(action.type) {	
		case UPDATE_INDEX:
			return {...state,...action.data}
		case GRAB_INDEX:
			return {...state,...action.data}
		default:
			return state;
	}
}

export default slideReducer;
