import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import admin from './modules/adminModule.js';
import flickr from './modules/flickrModule.js';
import msg from './modules/msgModule.js';
import allMsg from './modules/allMsgModule.js';

const reducers = combineReducers({
	admin,
	flickr,
	msg,
	allMsg
})

export default function configureStore(initialState){
	return createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension? window.devToolsExtension():f=>f
		)
	)
	
}

