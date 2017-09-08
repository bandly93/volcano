var express = require('express');
var flickrRouter = express.Router();
var axios = require('axios');
//var config = require('../../../config.js');

flickrRouter.route('/')

//WARNING ~~~~ be careful with the number you are slicing with. This is only working because videos and photos are both 6 letters.
// 		THIS WILL THROW AN ERROR ON HEROKU! *fixed
// 		Figure out how to fix the string manipulation. *fixed
// 		
.get((req,res) => {
	let index = (req.headers.referer).lastIndexOf('/');
	let pathname = (req.headers.referer).slice(index + 1);
	fetchPhotos(res,pathname);
})

//figure out a way to store/modularize this or use database to store?
//potential error with wedding photos and wedding videos. they could trigger each other's data object.
//This approach so that theres no extra fetch calls being made. 
let data = {}
data.portraits = '72157685685728341';
data.headshots = '72157686216916554';
data.wedding = '72157684929133582';
data.about = '72157685935838050';

const fetchPhotos = (res,pathname) => {
	const key = process.env.API_KEY //|| config.flickr.API_KEY;
	const user_id = process.env.USER_ID //|| config.flickr.USER_ID;
	let photoset_id = data[pathname];
	let url = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${key}&photoset_id=${photoset_id}&user_id=${user_id}&format=json&nojsoncallback=1`;
	let images = []
	axios.get(url)
	.then(response => {
		let photosArr = response.data.photoset.photo;
		photosArr.map(photoObj => images.push({
			url:constructJPG(photoObj),
			key:photoObj.id, 
			name:photoObj.title
			})
		);
		res.json({images:images})
	})
	.catch(error => console.log(error))
}

const constructJPG = (data) => `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`;

module.exports = flickrRouter;