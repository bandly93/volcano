import React,{Component} from "react";

class UploadTest extends Component{
	render(){
		return(
			<div>
				<form method = "post" encType = "multipart/form-data" action = "/upload">
					<input type = "file" name = "image"/>
					<input type = "submit"/>
				</form>
			</div>
		)
	}
}

export default UploadTest;
