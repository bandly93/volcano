import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import admin from './modules/adminModule.js';
import flickr from './modules/flickrModule.js';
import msg from './modules/msgModule.js';
import allMsg from './modules/allMsgModule.js';
import blog from './modules/blogModule.js';
import view from './modules/viewModule.js';
import upload from './modules/uploadModule.js';
import editor from './modules/editorModule.js';
import text from './modules/inputModule.js';
import oneEditor from './modules/oneEditorModule.js';


const reducers = combineReducers({
	admin,
	flickr,
	msg,
	allMsg,
	blog,
    view,
	upload,
    editor,
    oneEditor,
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

