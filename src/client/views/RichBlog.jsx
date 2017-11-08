import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../redux/modules/fetchThunk';


class RichBlog extends Component{
    render(){
        return(
            <div>
                Hello RichBlog!
            </div>
        )
    }

}


export default RichBlog;
