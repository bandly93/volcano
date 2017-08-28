import React, {Component} from 'react';
import DropdownMenu from 'react-dd-menu';

const name = "Videos";
const list = ["Lookbooks","ShortFilms","Music Videos","Weddings"]

class DropDown extends Component{
	constructor(props){
		super(props);
		this.state = {
			isMenuOpen : false
		}
		this.toggle = this.toggle.bind(this);
		this.click = this.click.bind(this);
		this.close = this.close.bind(this);
	}

	onToggle(){
		this.setState({})
	}
	onClick(){
		this.setState({isMenuOpen:false});
	}
	onClose(){
		console.log("You have clicked this item");
	}

	render(){
		return(
			<div>
				<DropdownMenu>
					<li> ITEM 1 </li>
					<li> ITEM 2 </li>
					<li> ITEM 3 </li>
					<li> ITEM 4 </li>
				</DropdownMenu>
			</div>
		)
	}
}

export default DropDown;