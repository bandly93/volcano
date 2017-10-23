//initial state
const display =(size)=>{
    return size <=812? 'none':'flex';

}

const initialState ={
    screenWidth:typeof window === 'object'? window.innerWidth:null,
    display:display(window.innerWidth)
};

//action creator
export const viewAct = display =>{
    return {
        type:'CHANGE_VIEW',
        screenWidth:display
    }
}
export const toggleMenu = ()=> {
    return {
        type:'TOGGLE_MENU'
    }
}

//reducer
export const view = (state=initialState,action) =>{
    switch(action.type){
        case 'CHANGE_VIEW':
            return {...state,
                screenWidth:action.screenWidth,
                display:display(action.screenWidth)
            }
        case 'TOGGLE_MENU':
            return {...state,
                display:state.display === 'none'?'flex':'none'
            }
        default:
            return state;
    }
} 



export default view;
