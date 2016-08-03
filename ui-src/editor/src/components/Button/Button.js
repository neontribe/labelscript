import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	propTypes: {
		icon: React.PropTypes.string	
	}
  
  	render() {
    	return (
			<button className="button" ><i className="material-icons">{this.props.icon}</i></button>
    	);
  	}
}

export default Button;
