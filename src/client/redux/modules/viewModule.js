//initial state
const initialState ={
    screenWidth:typeof window === 'object'? window.innerWidth:null
};

//action creator
export const viewAct = display =>{
    return {
        type:'CHANGE_VIEW',
        screenWidth:display
    }
}



//reducer
export const view = (state=initialState,action) =>{
    switch(action.type){
        case 'CHANGE_VIEW':
            return {...state,screenWidth:action.screenWidth}
        default:
            return state;
    }
} 



export default view;
