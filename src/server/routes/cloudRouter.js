var express = require('express');
var cloudRouter = express.Router();
var axios = require('axios');
var config = require('../../../config.js');

cloudRouter.route('/')

.get((req,res) => fetchPhotos(res))

const fetchPhotos = (res) => {
	const cloud_name = config.cloud.CLOUD_NAME;
	const key = config.cloud.API_KEY;
	const secret = config.cloud.SECRET;

	var url = `https://${key}:${secret}@api.cloudinary.com/v1_1/${cloud_name}/resources/image/`

	var images = []
	axios.get(url)
	.then(response => {
		response.data.resources.map(obj =>{
			images.push({key:obj.public_id,url:obj.secure_url});
		})
		res.json(images);
	})
	.catch(error => console.log(error))
}

module.exports = cloudRouter;