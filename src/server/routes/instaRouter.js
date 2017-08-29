var express = require('express');
var instaRouter = express.Router();
var axios =require('axios');


instaRouter.route('/')

.get(function(req,res){
	searchInsta(res,'pdagraphy');
})

function searchInsta(res,user){
	axios.get('https://www.instagram.com/' + user + '/media/')
	.then(response=>{
		var images = [];
		//console.log(response.data.items);
		response.data.items.forEach(function(image){
			images.push({
				key: image.id,
				image:image.images.standard_resolution.url
			})
		})
		res.json({images:images})
	})
	.catch(err =>console.log('server error'))
}
module.exports = instaRouter;