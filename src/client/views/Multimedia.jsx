import React,{Component} from 'react';
import Portraits from "../subViews/Portraits.jsx";
import Creative from "../subViews/Creative.jsx";
import Headshots from "../subViews/Headshots.jsx";
import WeddingPhotos from "../subViews/WeddingPhotos.jsx";
import Lookbooks from "../subViews/Lookbooks.jsx";
import WeddingVideos from "../subViews/WeddingVideos.jsx";
import MusicVideos from "../subViews/MusicVideos.jsx";
import ShortFilms from "../subViews/ShortFilms.jsx";
import SlideShow from '../components/SlideShow.jsx';
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
						<div className = "multimedia">
							<h1>Photos</h1>
							<Link to = "/portraits">
								<img src='https://farm5.staticflickr.com/4355/36883361836_82d0cb2496.jpg'/>
							</Link>
							<Link to = "/creative">
								<img src='https://via.placeholder.com/500x350'/>
							</Link>
							<Link to = "/headshots">
								<img src='https://farm5.staticflickr.com/4352/36236809334_007221032b.jpg'/>
							</Link>
							<Link to = "/weddingphotos">
								<img src='https://farm5.staticflickr.com/4347/36257977233_b65bd98d06.jpg'/>
							</Link>
						</div>
						<div className = "multimedia">
							<h1>Motion</h1>
							<Link to = "/lookbooks">
								<img src='https://via.placeholder.com/500x350'/>
							</Link>
							<Link to = "/weddingvideos">
								<img src='https://via.placeholder.com/500x350'/>
							</Link>
							<Link to = "/musicvideos">
								<img src='https://via.placeholder.com/500x350'/>
							</Link>
							<Link to = "/shortfilms">
								<img src='https://via.placeholder.com/500x350'/>
							</Link>
						</div> 
					</div>
				</div>
			</Router>
		)
	}
}
export default Multimedia;

