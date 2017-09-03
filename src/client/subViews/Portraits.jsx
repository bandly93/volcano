import React,{Component} from 'react'; 



class Portraits extends Component{
	
	render(){
		let photosObj = {
			'photo' : "https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg",
			'name' : "minions"
		}
		return(
			<img 
				src = {photosObj.photo} 
				key = {photosObj.name} />
		)
	}
}

export default Portraits;
