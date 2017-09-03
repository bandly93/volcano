import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import insta from './modules/instaModule.js';
import admin from './modules/adminModule.js';
import flickr from './modules/flickrModule.js';


const reducers = combineReducers({
	insta,
	admin,
	flickr
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

