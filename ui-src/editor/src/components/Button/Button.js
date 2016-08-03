import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	propTypes: {
		imageUrl: React.PropTypes.string	
	}
  
  	render() {
    	return (
			<div class="button"><button><img src={this.props.imageUrl}/></button></div>
    	);
  	}
}

export default Button;
