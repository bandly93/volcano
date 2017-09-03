//action
export function flickrAct(flickr){
	return{
		type:'FLICKR',
		flickr
	}
}

//reducer
export const flickr = (state = [],action)=>{
	switch(action.type){
		case 'FLICKR':
			return action.flickr 
		default:
			return state;
	}
}

export default flickr;