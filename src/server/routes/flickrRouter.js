var express = require("express");
var flickrRouter = express().Router;
var axios = require(axios);

//testing purposes 
var api_key = '647e979532eba1076860120f81f5cb57'
var user_id = '151931971%40N04' //bandly1993

var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key='+ api_key + '&user_id=' + user_id +'&format=json&nojsoncallback=1&auth_token=72157685944084373-5b383c86c7c6a99b&api_sig=b8e516de890711f0595cedc11eda6437';

//make get request to retrieve a response from the API


flickrRouter.route("/");

.get(function(req,res){


}