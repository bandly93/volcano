import React,{Component} from 'react';

class TextInput extends Component {
    updateInput=(e)=> {
        const {blog,updateInput} = this.props;
        updateInput(blog._id,e.target.value);
    }
    render(){
        return(
            <form>
                <input 
                    type='text'
                    value={this.props.inputValue} 
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
