import React,{Component} from 'react';

class TextInput extends Component {
    updateInput=(e)=> {
        const {data,updateInput} = this.props;
        updateInput(data._id,e.target.value);
    }
    onSubmit=(e)=> {
        e.preventDefault();
        const {data,onSubmit} = this.props;
        onSubmit(data);
    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
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
