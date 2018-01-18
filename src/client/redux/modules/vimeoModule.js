//create action and reducers for vimeo.

//action: holds some data and a type;

//reducers: takes in a state and action. then returns a new state;

//update the current url to the new state;
export const UPDATE_DATA = 'UPDATE_DATA';
export const GET_ALL = 'GET_ALL';


export const updateData = (data) => {
	return {
		type: UPDATE_DATA,
		data
	}
}

export const getData = (data) => {
	return {
		type: GET_ALL,
		data
	}
}

export const vimeoReducer = (state = initialState, action) => {
	switch(action.type){
		case UPDATE_DATA:
			return Object.assign({},state,{formData:action.data});
		case GET_ALL:
			return Object.assign({},state,action.data);
		default:
			return state;
	}
}

let initialState = {
	urlObj: [],
	formData: {
		name: '',
		url: ''
	}
}

export default vimeoReducer;
