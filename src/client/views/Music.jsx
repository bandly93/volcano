import React,{Component} from 'react';

function Music(){
	function say(){
		console.log('hello world')
	}
	return(
		<div>
			<p>Hello Music!</p>
			<button onClick={say}>click</button>
		</div>
	)

	
}
export default Music

