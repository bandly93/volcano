var qs = require('querystring');

//action thunk
export function fetchData(url,actFunc){
	return(dispatch)=>{
		fetch(url,{credentials:'same-origin'})
			.then(response=> response.json())
			.then(data=>{
				actFunc(data)
			})
	}
}

export function postInfo(url,method,data,actFunc){
	return(dispatch)=>{
		fetch(url,{
			method:method,
			credentials:'same-origin',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(data)
		})
		.then(response => response.json())
		.then(data=>{
			actFunc(data)
		})
	}
}
