//state modifiers

//dash side nav
const display =(size)=>{
    return size <=812? 'none':'flex';
}
const toggle = (size,display) =>{
    if(size <= 812){
        return display == 'none'? 'flex':'none';
    }
    return 'flex';

}
//main nav
const toggleMain = (size,navCon) => {
    if(size <= 812){
        return navCon == 'none'? 'flex':'none';
    }
    return 'block';
}
const navLinks = (size)=>{
    return size <=812? 'none':'block';
}
const hideMenu = (size,display) => {
    if(size <= 812 && display != 'none'){
        return 'none';
    }
}
//initial state
const initialState ={
    screenWidth:typeof window === 'object'? window.innerWidth:null,
    display:display(window.innerWidth),
    navLinks:navLinks(window.innerWidth)
};

//action creator
export const viewAct = display => {
    return {
        type:'CHANGE_VIEW',
        screenWidth:display 
    }
}
export const toggleDashNav = ()=> {
    return {
        type:'TOGGLE_DASH_NAV'
    }
}
export const toggleMainNav = () => {
    return {
        type:'TOGGLE_MAIN_NAV'
    }
}

//reducer
export const view = (state=initialState,action) =>{
    const {screenWidth} = action;
    switch(action.type){
        case 'CHANGE_VIEW':
            return {...state,
                screenWidth:screenWidth,
                display:display(screenWidth),
                navLinks:navLinks(screenWidth)
            }
        case 'TOGGLE_DASH_NAV':
            return {...state,
                display:toggle(state.screenWidth,state.display)
            }
        case 'TOGGLE_MAIN_NAV':
            return {...state,
                navLinks:toggleMain(state.screenWidth,state.navLinks)
            }
        default:
            return state;
    }
} 



export default view;
