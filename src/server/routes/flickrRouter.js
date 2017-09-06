var express = require('express');
var flickrRouter = express.Router();
var axios = require('axios');
//var config = require('../../../config.js');

flickrRouter.route('/')

//WARNING ~~~~ be careful with the number you are slicing with. This is only working because videos and photos are both 6 letters.
// 		THIS WILL THROW AN ERROR ON HEROKU!
// 		Figure out how to fix the string manipulation.
.get((req,res) => {
	let pathname = (req.headers.referer).slice(29);
	fetchPhotos(res,pathname);
})

//figure out a way to store/modularize this or use database to store?
let data = {}
data.portraits = '72157688653797855';
data.headshots = '72157685664756621';
data.wedding = '72157685664672911';
data.about = '72157686272557143';

const fetchPhotos = (res,pathname) => {
	const key = process.env.API_KEY //|| config.flickr.API_KEY;
	const user_id = process.env.USER_ID //|| config.flickr.USER_ID;
	const photoset_id = data[pathname];


	var url = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${key}&photoset_id=${photoset_id}&user_id=${user_id}&format=json&nojsoncallback=1`;
	var images = []
	axios.get(url)
	.then(response => {
		let photosArr = response.data.photoset.photo;
		photosArr.map(photoObj => {
			images.push({key:photoObj.id, url:constructJPG(photoObj)});
		})
		res.json({images:images})
	})
	.catch(error => console.log(error))
}

const constructJPG = (data) => `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`;

module.exports = flickrRouter;