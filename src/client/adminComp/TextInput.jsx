import React,{Component} from 'react';

class TextInput extends Component {
    updateInput=(e)=> {
        this.props.updateInput(e.target.value)
    }
    render(){
        return(
            <form>
                <input 
                    type='text' 
                    onChange={this.updateInput} 
                />
                <input  
                    type='submit'
                    value='Add Image' 
                />
            </form>
        )
    }
}

export default TextInput;
