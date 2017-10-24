//initial state
const display =(size)=>{
    return size <=812? 'none':'flex';
}
const navDisplay = (size) => {
    return size <=812? 'column':'row'
}
const toggle = (size,display) =>{
    if(size <= 812){
        return display == 'none'? 'flex':'none';
    }
    return 'flex';
}
const initialState ={
    screenWidth:typeof window === 'object'? window.innerWidth:null,
    display:display(window.innerWidth),
    navDisplay: navDisplay(window.innerWidth)
};

//action creator
export const viewAct = display => {
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
export const toggleView = () => {
    return {
        type:'TOGGLE_VIEW'
    }
}

//reducer
export const view = (state=initialState,action) =>{
    switch(action.type){
        case 'CHANGE_VIEW':
            return {...state,
                screenWidth:action.screenWidth,
                display:display(action.screenWidth),
                navDisplay:navDisplay(action.screenWidth)
            }
        case 'TOGGLE_MENU':
            return {...state,
                display:toggle(state.screenWidth,state.display)
            }
        default:
            return state;
    }
} 



export default view;
