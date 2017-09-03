var express = require('express');
var instaRouter = express.Router();
var axios =require('axios');


instaRouter.route('/')

.get(function(req,res){
	//searchInsta(res,'pdagraphy');
	fetchInsta(res,'pdagraphy','xinhjr')
})

// function searchInsta(res,user){
// 	axios.get('https://www.instagram.com/' + user + '/media/')
// 	.then(response=>{
// 		var images = [];
// 		//console.log(response.data.items);
// 		response.data.items.forEach(function(image){
// 			images.push({
// 				key: image.id,
// 				image:image.images.standard_resolution.url
// 			})
// 		})
// 		res.json({images:images})
// 	})
// 	.catch(err =>console.log('server error'))
// }


function fetchInsta(res,user1,user2){
	var images = [];
	axios.get('https://www.instagram.com/' + user1 + '/media/')
	.then(response=>{
		organizeData(response,images)
		return axios.get('https://www.instagram.com/' + user2 + '/media/')
	})
	.then(response=>{
		organizeData(response,images)
		res.json({images:images})
	})
	.catch(err => console.log(err))
}
function organizeData(response,images){
	response.data.items.forEach(function(image){
			images.push({
				key: image.id,
				image:image.images.standard_resolution.url
			})
		})
}
module.exports = instaRouter;