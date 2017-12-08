// action
export function updateInput(id,input) {
    return {
        type: 'UPDATE_INPUT',
        id,
        input
    }
}

// reducer
export const text = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_INPUT':
            return {
                ...state,
                imageURL: action.input
            }
        default:
            return state;
    }
}

// initial state

let initialState = {
    imageURL: 'hello world',
    
}

export default text;
