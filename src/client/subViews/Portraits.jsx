import React,{Component} from 'react'; 


let photosArr = [
	{
		photo : 'https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg',
		name : 'minions'
	},
	{
		photo : 'http://www.unaids.org/sites/default/files/media/20170324_TBDay_PR_960.jpg',
		name : 'girl'
	}
]

class Portraits extends Component{
	render(){
		return(
			<div>
				{
					photosArr.map(photo => {
						return (
							<img 
								className = "flickr-photo"
								src = {photo.photo} 
								key = {photo.name} />
						)
					})
				}
			</div>
		)
	}
}

export default Portraits;
