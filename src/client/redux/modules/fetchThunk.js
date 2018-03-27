var qs = require('qs');

//action thunk
export function fetchData(url,actFunc){
	return(dispatch)=>{
		fetch(url, {credentials:'same-origin'})
			.then(function(res) {
//                console.log(res);
                return res.json()
            })
			.then(data => {
 //                   console.log(data);
                return actFunc(data)
			})
            .catch(function(err) {
                console.log('error', err);
            });
	}
}

export function postData(url,method,data,actFunc){
	return(dispatch) => {
		fetch(url,{
			method:method,
			credentials:'same-origin',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(data)
		})
        .then(response =>  response.json())
        .catch(function(err){
            console.log('json error',err);
        })
        .then(data => {
			if(actFunc){
				actFunc(data)
			}
     	}).catch(function(err){
 			console.log('data error',err);
 		});
	}
}

