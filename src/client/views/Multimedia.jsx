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
		const path = this.props.match.path;
		return(
			<Router>
				<div>
					<Switch>
						<Route exact path = {`${path}/portraits`} component = {Portraits}/>
						<Route exact path = "/creative" component = {Creative}/>
						<Route exact path = "/headshots" component = {Headshots}/>
						<Route exact path = "/weddingphotos" component = {WeddingPhotos}/>
						<Route exact path = "/lookbooks" component = {Lookbooks}/>
						<Route exact path = "/weddingvideos" component = {WeddingVideos}/>
						<Route exact path = "/musicvideos" component = {MusicVideos}/>
						<Route exact path = "/shortfilms" component = {ShortFilms}/>
					</Switch>
					<div className = "multimedia-flexbox">
						<div className = "multimedia">
							<h1>Photos</h1>
							<Link to = {`${path}/portraits`} >
								<img src='https://farm5.staticflickr.com/4355/36883361836_82d0cb2496.jpg'/>
								<p>PORTRAITS</p>
							</Link>
							<Link to = "/creative">
								<img src='https://via.placeholder.com/500x350'/>
								<p>CREATIVE</p>
							</Link>
							<Link to = "/headshots">
								<img src='https://farm5.staticflickr.com/4352/36236809334_007221032b.jpg'/>
								<p>HEADSHOTS</p>
							</Link>
							<Link to = "/weddingphotos">
								<img src='https://farm5.staticflickr.com/4347/36257977233_b65bd98d06.jpg'/>
								<p>WEDDING PHOTOS</p>
							</Link>
						</div>
						<div className = "multimedia">
							<h1>Motion</h1>
							<Link to = "/lookbooks">
								<img src='https://via.placeholder.com/500x350'/>
								<p>LOOKBOOKS</p>
							</Link>
							<Link to = "/weddingvideos">
								<img src='https://via.placeholder.com/500x350'/>
								<p>WEDDING VIDEOS</p>
							</Link>
							<Link to = "/musicvideos">
								<img src='https://via.placeholder.com/500x350'/>
								<p>MUSIC VIDEOS</p>
							</Link>
							<Link to = "/shortfilms">
								<img src='https://via.placeholder.com/500x350'/>
								<p>SHORT FILMS</p>
							</Link>
						</div> 
					</div>
				</div>
			</Router>
		)
	}
}
export default Multimedia;

