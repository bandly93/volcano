//create action and reducers for vimeo.

//action: holds some data and a type;

//reducers: takes in a state and action. then returns a new state;

//update the current url to the new state;
export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';

export const updateData = (data) => {
	return {
		type: UPDATE_DATA,
		data
	}
}

export const updateCurrentVideo = (data) => {
	return {
		type : UPDATE_VIDEO,
		data
	}
}

export const vimeoReducer = (state = initialState, action) => {
	switch(action.type){
		case UPDATE_DATA:
			return Object.assign({},state,action.data);
		case UPDATE_VIDEO:
			return Object.assign({},state,{id:action.data});
		default:
			return state;
	}
}

let initialState = {
	id: 1,
	urlObj: [],
	name: '',
	url: ''
}

export default vimeoReducer;