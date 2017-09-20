import React,{Component} from 'react';
import Portraits from "../subViews/Portraits.jsx";
import Creative from "../subViews/Creative.jsx";
import Headshots from "../subViews/Headshots.jsx";
import WeddingPhotos from "../subViews/WeddingPhotos.jsx";
import Lookbooks from "../subViews/Lookbooks.jsx";
import WeddingVideos from "../subViews/WeddingVideos.jsx";
import MusicVideos from "../subViews/MusicVideos.jsx";
import ShortFilms from "../subViews/ShortFilms.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Multimedia extends Component{
	render(){
		return(
			<Router>
				<div>
					<Switch>
						<Route path = "/portraits" component = {Portraits}/>
						<Route path = "/creative" component = {Creative}/>
						<Route path = "/headshots" component = {Headshots}/>
						<Route path = "/weddingphotos" component = {WeddingPhotos}/>
						<Route path = "/lookbooks" component = {Lookbooks}/>
						<Route path = "/weddingvideos" component = {WeddingVideos}/>
						<Route path = "/musicvideos" component = {MusicVideos}/>
						<Route path = "/shortfilms" component = {ShortFilms}/>
					</Switch>
					<div className = "multimedia-flexbox">
						<div className = "multimedia-right-side">
							<h1>Photos</h1>
							<Link to = "/portraits">Portraits</Link>
							<Link to = "/creative">Creative</Link>
							<Link to = "/headshots">Headshots</Link>
							<Link to = "/weddingphotos">Wedding Photos</Link>
						</div>
						<div className = "multimedia-left-side">
							<h1>Videos</h1>
							<Link to = "/lookbooks">Lookbooks</Link>
							<Link to = "/weddingvideos">Wedding Videos</Link>
							<Link to = "/musicvideos">Music Videos</Link>
							<Link to = "/shortfilms">Short Films</Link>
						</div> 
					</div>
					
				</div>
			</Router>
		)
	}
}
export default Multimedia;

