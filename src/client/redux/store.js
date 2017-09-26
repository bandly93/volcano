import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import admin from './modules/adminModule.js';
import flickr from './modules/flickrModule.js';
import msg from './modules/msgModule.js';
import allMsg from './modules/allMsgModule.js';
import blog from './modules/blogModule.js';


const reducers = combineReducers({
	admin,
	flickr,
	msg,
	allMsg,
	blog
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

