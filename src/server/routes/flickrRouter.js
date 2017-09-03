var express = require('express');
var flickrRouter = express.Router();
var axios = require('axios');
var config = require('../../../config.js');

flickrRouter.route('/')

.get((req,res) => fetchData(res))

const fetchData = (res) => {
	var url = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${config.API_KEY}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;
	var images = []
	axios.get(url)
	.then(response => {
		let obj = response.data.photos.photo;
		let id = response.data.id
		res.json({obj});
		obj.forEach(data => {
			let photoObj = {}
				photoObj.id = data.id;
				photoObj.photo = constructJPG(data);
			images.push(photoObj);
		})
	})
	.catch(error => console.log(error))
}

const constructJPG = (data) => `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`;



module.exports = flickrRouter;