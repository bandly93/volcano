//create action and reducers for vimeo.

//action: holds some data and a type;

//reducers: takes in a state and action. then returns a new state;

//update the current url to the new state;
export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (data) => {
	return {
		type: UPDATE_DATA,
		data
	}
}

export const vimeoReducer = (state = initialState, action) => {
	switch(action.type){
		case UPDATE_DATA:
			return {...state,...action.data};
		default:
			return state;
	}
}

let initialState = {
	name: '',
	url: '',
	slideId:1,
	slides:{},
	videoId:1
}

export default vimeoReducer;
