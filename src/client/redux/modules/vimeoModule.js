//create action and reducers for vimeo.

//action: holds some data and a type;

//reducers: takes in a state and action. then returns a new state;

//update the current url to the new state;
export const UPDATE_URL = 'UPDATE_URL';
export const UPDATE_NAME = 'UPDATE_NAME';
export const GET_ALL = 'GET_ALL';

export const updateURL = (url) => {
	return {
		type: UPDATE_URL,
		url
	}
}

export const updateName = (name) => {
	return {
		type: UPDATE_NAME,
		name
	}
}

export const getAllData = () => {
	return {
		type:GET_ALL
	}
}

export const vimeoReducer = (state = {}, action) => {
	switch(action.type){
		case UPDATE_URL:
			return Object.assign({},{url:action.url});
		case UPDATE_NAME:
			return Object.assign({},{name:action.name});
		case GET_ALL:
			return state;
		default:
			return state;
	}
}

export default vimeoReducer;
